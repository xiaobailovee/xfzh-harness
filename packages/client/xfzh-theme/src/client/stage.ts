import type { Context } from '@deepseek-ai/cordis'
import { XFZH_ART } from './art.ts'

const OWNER = 'xfzh-theme'

function artImage(src: string, part: string): HTMLImageElement {
  const image = document.createElement('img')
  image.alt = ''
  image.src = src
  image.dataset.xfzhPart = part
  image.dataset.skinOwner = OWNER
  image.setAttribute('aria-hidden', 'true')
  image.draggable = false
  return image
}

function chrome(kind: string): HTMLDivElement {
  const node = document.createElement('div')
  node.dataset.xfzhChrome = kind
  node.dataset.skinOwner = OWNER
  node.setAttribute('aria-hidden', 'true')
  return node
}

function createSidebarCorners(): HTMLDivElement {
  const corners = chrome('sidebar-corners')
  for (const position of ['top-left', 'top-right', 'bottom-right', 'bottom-left']) {
    const corner = document.createElement('span')
    corner.dataset.xfzhCorner = position
    corners.append(corner)
  }
  return corners
}

function createSidebarMascot(): HTMLImageElement {
  const mascot = artImage(XFZH_ART.chibi, 'mascot')
  mascot.dataset.xfzhChrome = 'sidebar-mascot'
  return mascot
}

function seat(parent: Element | null, node: HTMLElement, where: 'prepend' | 'append'): boolean {
  if (parent === null) {
    node.remove()
    return false
  }
  if (node.parentElement !== parent) parent[where](node)
  return true
}

/**
 * Seat sidebar cat-ear corners and the chibi mascot. The conversation column
 * already paints `--xfzh-bg-image`; this effect only owns extra DOM so unload
 * restores the official tree.
 * @param ctx - owning plugin context.
 */
export function installXfzhStage(ctx: Context): void {
  /* v8 ignore next -- needs a documentless run, not constructible under jsdom */
  if (typeof document === 'undefined') return
  ctx.effect(() => {
    const corners = createSidebarCorners()
    const mascot = createSidebarMascot()
    document.body.dataset.xfzhSkin = ''

    const attach = (): void => {
      const sidebar = document.querySelector('[data-sidebar-root]')
      seat(sidebar, corners, 'prepend')
      seat(sidebar, mascot, 'prepend')
    }

    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
      corners.remove()
      mascot.remove()
      delete document.body.dataset.xfzhSkin
    }
  }, 'xfzh-theme: illustrated stage')
}
