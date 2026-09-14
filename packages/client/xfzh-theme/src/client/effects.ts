import type { Context } from '@deepseek-ai/cordis'
import sprite from './icon-sprite.ts'
import { XFZH_CLICK_GLYPHS, XFZH_SPRINKLE } from './glyphs.ts'

const BURST_MS = 780
const BURST_COUNT = 3
const SPRITE_ID = 'xfzh-icon-sprite'

function reducedMotion(): boolean {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function pickGlyph(from: number): string {
  const glyph = XFZH_CLICK_GLYPHS.at(Math.abs(from) % XFZH_CLICK_GLYPHS.length)
  return glyph ?? 'jumao'
}

function iconUse(name: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
  use.setAttribute('href', `#icon-${name}`)
  svg.setAttribute('aria-hidden', 'true')
  svg.appendChild(use)
  return svg
}

function burst(x: number, y: number): void {
  const seed = Math.floor(x + y + Date.now())
  for (let i = 0; i < BURST_COUNT; i += 1) {
    const node = iconUse(pickGlyph(seed + i * 17))
    node.classList.add('xfzh-burst')
    const dx = ((i - 1) * 18) + ((seed + i * 9) % 11) - 5
    const dy = -28 - ((seed + i * 13) % 18)
    const spin = ((seed + i * 23) % 40) - 20
    node.style.left = `${x}px`
    node.style.top = `${y}px`
    node.style.setProperty('--xfzh-burst-x', `${dx}px`)
    node.style.setProperty('--xfzh-burst-y', `${dy}px`)
    node.style.setProperty('--xfzh-burst-rot', `${spin}deg`)
    document.body.appendChild(node)
    window.setTimeout(() => { node.remove() }, BURST_MS)
  }
}

/**
 * Mount the colorful iconfont sprite, sprinkle original-color glyphs, and spawn
 * a short burst on click. Overlay-owned: no official component mounts these nodes.
 * @param ctx - Owning plugin context.
 */
export function installXfzhEffects(ctx: Context): void {
  /* v8 ignore next -- needs a documentless run, not constructible under jsdom */
  if (typeof document === 'undefined') return
  ctx.effect(() => {
    const holder = document.createElement('div')
    holder.id = SPRITE_ID
    holder.setAttribute('aria-hidden', 'true')
    holder.style.position = 'absolute'
    holder.style.width = '0'
    holder.style.height = '0'
    holder.style.overflow = 'hidden'
    holder.innerHTML = sprite
    document.body.prepend(holder)

    const layer = document.createElement('div')
    layer.className = 'xfzh-sprinkle'
    layer.setAttribute('aria-hidden', 'true')
    for (const spec of XFZH_SPRINKLE) {
      const item = iconUse(spec.glyph)
      item.classList.add('xfzh-sprinkle-item')
      item.style.left = spec.left
      item.style.top = spec.top
      item.style.width = spec.size
      item.style.height = spec.size
      item.style.transform = `rotate(${spec.rotate})`
      layer.appendChild(item)
    }
    const attachSprinkle = (): void => {
      const host = document.querySelector('[data-conversation-root]')
      if (host instanceof HTMLElement && layer.parentElement !== host) host.prepend(layer)
    }
    attachSprinkle()
    const observer = new MutationObserver(attachSprinkle)
    observer.observe(document.body, { childList: true, subtree: true })

    const onPointerDown = (event: PointerEvent): void => {
      if (!holder.isConnected) return
      if (event.button !== 0) return
      if (reducedMotion()) return
      const target = event.target
      if (target instanceof Element && target.closest('input, textarea, [contenteditable="true"]')) return
      burst(event.clientX, event.clientY)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      observer.disconnect()
      layer.remove()
      holder.remove()
      document.querySelectorAll('.xfzh-burst').forEach((node) => { node.remove() })
    }
  }, 'xfzh-theme: cute glyph effects')
}
