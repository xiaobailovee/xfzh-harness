// @vitest-environment jsdom
import { Context } from '@deepseek-ai/cordis'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { SlotRegistry } from '@deepseek-ai/dsh-client-ui-renderer/client'
import { apply, inject } from '../src/client/index.ts'
import { XfzhMark, XfzhName } from '../src/client/Brand.tsx'
import { apply as hostApply } from '../src/index.ts'
import { XFZH_TOKENS } from '../src/client/tokens.ts'

afterEach(() => {
  cleanup()
  delete window.dshDesktop
  document.documentElement.classList.remove('xfzh-desktop')
  document.head.querySelectorAll('style[data-plugin="@deepseek-ai/dsh-client-xfzh-theme"]').forEach((node) => {
    node.remove()
  })
})

const HOLES = [
  'sidebar.brand.mark',
  'sidebar.brand.name',
  'conversation.hero.brand.mark',
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
  return { ctx, slots, theme, declareHoles, disposeHoles }
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
    expect(XFZH_TOKENS['--dsw-alias-brand-primary']?.light).toBe('rgb(217, 107, 138)')
    expect(XFZH_TOKENS['--dsw-alias-brand-primary']?.dark).toBe('rgb(242, 167, 184)')
    expect(XFZH_TOKENS['--dsw-specific-bubble']?.light).toBe('rgb(253, 226, 232)')
    expect(XFZH_TOKENS['--dsw-specific-sidebar-fill']?.light).toBe('rgb(255, 236, 240)')
  })

  it('stacks the token overlay, occupies every brand hole, and tears them down', async () => {
    const subject = await bench()
    const fiber = subject.ctx.plugin({ inject: [...inject], apply })
    await fiber.await()

    expect(subject.theme.overrideTokens).toHaveBeenCalledWith('xfzh-theme', XFZH_TOKENS)
    for (const hole of HOLES) expect(subject.slots.entries(hole)).toHaveLength(1)
    expect(document.head.querySelector(`style[data-plugin-css="${PLUGIN_ID}/overlay.css"]`)).toBeTruthy()
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
  })

  it('leaves holes empty until their declarations exist, then fills them', async () => {
    const after = await bench(false)
    await after.ctx.plugin({ inject: [...inject], apply }).await()
    for (const hole of HOLES) expect(after.slots.entries(hole)).toHaveLength(0)
    after.declareHoles()
    await Promise.resolve()
    for (const hole of HOLES) expect(after.slots.entries(hole)).toHaveLength(1)
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

  it('renders the xfzh name independently from both requested mark sizes', () => {
    const name = render(<XfzhName />)
    expect(name.container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 72 24')
    expect(name.container.textContent).toBe('xfzh')
    name.unmount()

    const mark = render(<XfzhMark size={34} />)
    expect(mark.container.querySelector('svg')?.getAttribute('width')).toBe('34')
    expect(mark.container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 24 24')
    mark.rerender(<XfzhMark size={24} className="hero" />)
    expect(mark.container.querySelector('svg')?.getAttribute('width')).toBe('24')
    expect(mark.container.querySelector('svg')?.getAttribute('class')).toBe('hero')
  })
})
