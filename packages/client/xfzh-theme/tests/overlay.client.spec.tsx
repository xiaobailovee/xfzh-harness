// @vitest-environment jsdom
import { Context } from '@deepseek-ai/cordis'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { XFZH_CLICK_GLYPHS, XFZH_GLYPH, XFZH_SPRINKLE } from '../src/client/glyphs.ts'
import { XFZH_HEADLINE } from '../src/client/locales.ts'
import { SlotRegistry } from '@deepseek-ai/dsh-client-ui-renderer/client'
import { apply, inject } from '../src/client/index.ts'
import { XfzhMark, XfzhName } from '../src/client/Brand.tsx'
import { XfzhHeadline } from '../src/client/Greeting.tsx'
import { apply as hostApply } from '../src/index.ts'
import { XFZH_TOKENS } from '../src/client/tokens.ts'

afterEach(() => {
  cleanup()
  delete window.dshDesktop
  document.documentElement.classList.remove('xfzh-desktop')
  document.head.querySelectorAll('style[data-plugin="@deepseek-ai/dsh-client-xfzh-theme"]').forEach((node) => {
    node.remove()
  })
  delete document.body.dataset.xfzhSkin
  document.querySelectorAll(
    '.xfzh-sprinkle, .xfzh-burst, #xfzh-icon-sprite, [data-conversation-root], [data-sidebar-root], [data-composer-card], [data-xfzh-chrome], .xfzh-stage',
  ).forEach((node) => {
    node.remove()
  })
})

const HOLES = [
  'sidebar.brand.mark',
  'sidebar.brand.name',
  'conversation.hero.brand.mark',
  'conversation.hero.headline',
] as const

const PLUGIN_ID = '@deepseek-ai/dsh-client-xfzh-theme'

function fakeTheme() {
  const dispose = vi.fn()
  const overrideTokens = vi.fn(() => dispose)
  return { overrideTokens, dispose }
}

async function bench(declare = true) {
  const ctx = new Context()
  await ctx.plugin(SlotRegistry).await()
  const slots = ctx.get('slots') as SlotRegistry
  const theme = fakeTheme()
  ctx.provide('theme', theme)
  const declareHoles = () => slots.register({
    name: 'root',
    children: Object.fromEntries(HOLES.map(name => [name, { kind: 'single', scope: 'root' }])),
  } as never, () => null)
  const disposeHoles = declare ? declareHoles() : undefined
  const conversation = document.createElement('div')
  conversation.setAttribute('data-conversation-root', '')
  document.body.appendChild(conversation)
  return { ctx, slots, theme, declareHoles, disposeHoles, conversation }
}

describe('xfzh-theme overlay', () => {
  it('keeps the host Loader entry inert', () => {
    expect(() => { hostApply() }).not.toThrow()
  })

  it('declares the theme and slot services it uses', () => {
    expect(inject).toEqual(['theme', 'slots'])
  })

  it('maps every token to a { light, dark } string pair', () => {
    expect(Object.keys(XFZH_TOKENS).length).toBeGreaterThan(40)
    for (const [name, modes] of Object.entries(XFZH_TOKENS)) {
      expect(name.startsWith('--dsw-')).toBe(true)
      expect(typeof modes.light).toBe('string')
      expect(typeof modes.dark).toBe('string')
      expect(modes.light.length).toBeGreaterThan(0)
      expect(modes.dark.length).toBeGreaterThan(0)
    }
    expect(XFZH_TOKENS['--dsw-alias-brand-primary']?.light).toBe('rgb(196, 139, 96)')
    expect(XFZH_TOKENS['--dsw-alias-brand-primary']?.dark).toBe('rgb(212, 165, 116)')
    expect(XFZH_TOKENS['--dsw-alias-button-info-fill']?.light).toBe('rgb(244, 168, 161)')
    expect(XFZH_TOKENS['--dsw-alias-button-info-fill']?.light).not.toBe(
      XFZH_TOKENS['--dsw-alias-brand-primary']?.light,
    )
    expect(XFZH_TOKENS['--dsw-specific-bubble']?.light).toBe('rgb(246, 237, 227)')
    expect(XFZH_TOKENS['--dsw-specific-sidebar-fill']?.light).toBe('rgb(242, 236, 228)')
  })

  it('stacks the token overlay, occupies every brand hole, and tears them down', async () => {
    const subject = await bench()
    const fiber = subject.ctx.plugin({ inject: [...inject], apply })
    await fiber.await()

    expect(subject.theme.overrideTokens).toHaveBeenCalledWith('xfzh-theme', XFZH_TOKENS)
    for (const hole of HOLES) expect(subject.slots.entries(hole)).toHaveLength(1)
    const sheet = document.head.querySelector(`style[data-plugin-css="${PLUGIN_ID}/overlay.css"]`)
    expect(sheet).toBeTruthy()
    expect(sheet?.textContent).toContain("font-family: 'Jiaotangzi'")
    expect(sheet?.textContent).toContain('--xfzh-sticker-composer')
    expect(sheet?.textContent).toContain('data:image/svg+xml')
    expect(document.getElementById('xfzh-icon-sprite')?.querySelector('symbol#icon-jumao')).toBeTruthy()
    expect(document.getElementById('xfzh-icon-sprite')?.innerHTML).toContain('#F8CB8F')
    expect(subject.conversation.querySelectorAll('.xfzh-sprinkle-item').length).toBeGreaterThan(8)
    expect(subject.conversation.querySelector('.xfzh-sprinkle-item use')?.getAttribute('href')).toMatch(/^#icon-/)
    expect(document.body.querySelector(':scope > .xfzh-sprinkle')).toBeNull()
    expect(subject.conversation.querySelector('[data-xfzh-char]')).toBeNull()
    expect(subject.conversation.querySelector('.xfzh-stage')).toBeNull()
    expect(document.body.dataset.xfzhSkin).toBe('')
    expect(document.documentElement.classList.contains('xfzh-desktop')).toBe(false)

    subject.disposeHoles?.()
    for (const hole of HOLES) expect(subject.slots.entries(hole)).toHaveLength(0)
    subject.declareHoles()
    await Promise.resolve()
    for (const hole of HOLES) expect(subject.slots.entries(hole)).toHaveLength(1)

    await fiber.dispose()
    for (const hole of HOLES) expect(subject.slots.entries(hole)).toHaveLength(0)
    expect(subject.theme.dispose).toHaveBeenCalled()
    expect(document.head.querySelectorAll(`style[data-plugin="${PLUGIN_ID}"]`)).toHaveLength(0)
    expect(document.querySelector('.xfzh-sprinkle')).toBeNull()
    expect(document.getElementById('xfzh-icon-sprite')).toBeNull()
    expect(document.querySelector('.xfzh-stage')).toBeNull()
    expect(document.body.dataset.xfzhSkin).toBeUndefined()
  })

  it('leaves holes empty until their declarations exist, then fills them', async () => {
    const after = await bench(false)
    const fiber = after.ctx.plugin({ inject: [...inject], apply })
    await fiber.await()
    for (const hole of HOLES) expect(after.slots.entries(hole)).toHaveLength(0)
    after.declareHoles()
    await Promise.resolve()
    for (const hole of HOLES) expect(after.slots.entries(hole)).toHaveLength(1)
    await fiber.dispose()
  })

  it('marks the document as a desktop caption host when the desktop marker exists', async () => {
    window.dshDesktop = { protocolVersion: 1 }
    const subject = await bench()
    const fiber = subject.ctx.plugin({ inject: [...inject], apply })
    await fiber.await()
    expect(document.documentElement.classList.contains('xfzh-desktop')).toBe(true)
    await fiber.dispose()
    expect(document.documentElement.classList.contains('xfzh-desktop')).toBe(false)
  })

  it('asks the desktop shell to dim the caption overlay while a modal is open', async () => {
    const setTitleBarOverlay = vi.fn(async () => {})
    window.dshDesktop = { protocolVersion: 1, setTitleBarOverlay }
    const subject = await bench()
    const fiber = subject.ctx.plugin({ inject: [...inject], apply })
    await fiber.await()
    expect(setTitleBarOverlay).not.toHaveBeenCalled()

    const dialog = document.createElement('div')
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'true')
    document.body.appendChild(dialog)
    await vi.waitFor(() => { expect(setTitleBarOverlay).toHaveBeenCalledWith(true) })

    dialog.remove()
    await vi.waitFor(() => { expect(setTitleBarOverlay).toHaveBeenCalledWith(false) })
    await fiber.dispose()
  })

  it('keeps sprinkle glyphs apart and out of the conversation sticker corner', () => {
    expect(new Set(XFZH_SPRINKLE.map(spec => `${spec.left}|${spec.top}`)).size).toBe(XFZH_SPRINKLE.length)
    for (const spec of XFZH_SPRINKLE) {
      const left = Number.parseFloat(spec.left)
      const top = Number.parseFloat(spec.top)
      expect(left > 80 && top > 70).toBe(false)
    }
  })

  it('spawns cute glyph bursts on click and keeps the full icon set decorative', async () => {
    expect(XFZH_CLICK_GLYPHS).toHaveLength(Object.keys(XFZH_GLYPH).length)
    expect(XFZH_GLYPH.keainiujiaobao).toBe('keainiujiaobao')
    const subject = await bench()
    const fiber = subject.ctx.plugin({ inject: [...inject], apply })
    await fiber.await()
    fireEvent.pointerDown(document.body, { button: 0, clientX: 40, clientY: 80 })
    expect(document.querySelectorAll('.xfzh-burst').length).toBe(3)
    expect(document.querySelector('.xfzh-burst use')?.getAttribute('href')).toMatch(/^#icon-/)
    fireEvent.pointerDown(document.body, { button: 2, clientX: 40, clientY: 80 })
    expect(document.querySelectorAll('.xfzh-burst').length).toBe(3)
    const field = document.createElement('input')
    document.body.appendChild(field)
    fireEvent.pointerDown(field, { button: 0, clientX: 12, clientY: 12 })
    expect(document.querySelectorAll('.xfzh-burst').length).toBe(3)
    field.remove()
    await fiber.dispose()
    expect(document.querySelectorAll('.xfzh-burst')).toHaveLength(0)
  })

  it('skips click bursts when the user prefers reduced motion', async () => {
    window.matchMedia = ((query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() { return false },
    })) as typeof window.matchMedia
    const subject = await bench()
    const fiber = subject.ctx.plugin({ inject: [...inject], apply })
    await fiber.await()
    fireEvent.pointerDown(document.body, { button: 0, clientX: 16, clientY: 16 })
    expect(document.querySelectorAll('.xfzh-burst')).toHaveLength(0)
    await fiber.dispose()
  })

  it('seats sidebar corners and mascot on the live host', async () => {
    const subject = await bench()
    const sidebar = document.createElement('div')
    sidebar.setAttribute('data-sidebar-root', '')
    document.body.appendChild(sidebar)
    const composer = document.createElement('div')
    composer.setAttribute('data-composer-card', '')
    document.body.appendChild(composer)
    const fiber = subject.ctx.plugin({ inject: [...inject], apply })
    await fiber.await()
    expect(composer.querySelector('[data-xfzh-chrome="composer"]')).toBeNull()
    expect(sidebar.querySelector('[data-xfzh-chrome="sidebar-corners"]')).toBeTruthy()
    expect(sidebar.querySelector('[data-xfzh-chrome="sidebar-mascot"]')).toBeTruthy()

    const dialog = document.createElement('div')
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'true')
    document.body.appendChild(dialog)
    await vi.waitFor(() => {
      expect(dialog.querySelector('[data-xfzh-chrome="settings-frame"]')).toBeNull()
    })
    dialog.remove()
    await fiber.dispose()
    expect(document.querySelector('[data-xfzh-chrome="sidebar-mascot"]')).toBeNull()
    sidebar.remove()
    composer.remove()
  })

  it('occupies the hero headline with the fixed xfzh line', () => {
    expect(XFZH_HEADLINE).toBe('心之所向，行之所往')
    const view = render(<XfzhHeadline />)
    expect(view.container.querySelector('[data-hero-headline]')?.textContent).toBe(XFZH_HEADLINE)
    view.unmount()
  })

  it('renders the xfzh name independently from both requested mark sizes', () => {
    const name = render(<XfzhName />)
    expect(name.container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 72 24')
    expect(name.container.textContent).toBe('xfzh')
    expect(name.container.querySelector('text')?.getAttribute('font-family')).toContain('Jiaotangzi')
    name.unmount()

    const mark = render(<XfzhMark size={34} />)
    expect(mark.container.querySelector('svg')?.getAttribute('width')).toBe('34')
    expect(mark.container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 24 24')
    expect(mark.container.querySelector('path')?.getAttribute('d')).toContain('M7.2 8.4')
    mark.rerender(<XfzhMark size={24} className="hero" />)
    expect(mark.container.querySelector('svg')?.getAttribute('width')).toBe('24')
    expect(mark.container.querySelector('svg')?.getAttribute('class')).toBe('hero')
  })
})
