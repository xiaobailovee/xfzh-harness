/**
 * Always-on cozy-cat / night-latte overlay: token layer, cafe wallpaper,
 * sticker sheet, and xfzh brand occupants.
 */
import type { Context as ClientContext } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
import { XfzhMark, XfzhName } from './Brand.tsx'
import { XfzhHeadline } from './Greeting.tsx'
import { installXfzhEffects } from './effects.ts'
import { installXfzhStage } from './stage.ts'
import { installXfzhStyles } from './styles.ts'
import { XFZH_TOKENS } from './tokens.ts'

/** Required services: the theme overlay API and UI slots. */
export const inject = ['theme', 'slots']

function installDesktopCaptionClass(ctx: ClientContext): void {
  /* v8 ignore next -- needs a documentless run, not constructible under jsdom */
  if (typeof document === 'undefined') return
  ctx.effect(() => {
    const desktop = window.dshDesktop?.protocolVersion === 1
    if (desktop) document.documentElement.classList.add('xfzh-desktop')
    return () => {
      if (desktop) document.documentElement.classList.remove('xfzh-desktop')
    }
  }, 'xfzh-theme: desktop caption class')
}

/**
 * Chromium's titleBarOverlay sits above the web mask, so a modal leaves a
 * bright caption chip. Ask the shell to retint it while `aria-modal` is up.
 */
function installDesktopCaptionMask(ctx: ClientContext): void {
  /* v8 ignore next -- needs a documentless run, not constructible under jsdom */
  if (typeof document === 'undefined') return
  ctx.effect(() => {
    const setTitleBarOverlay = window.dshDesktop?.setTitleBarOverlay
    if (window.dshDesktop?.protocolVersion !== 1 || typeof setTitleBarOverlay !== 'function') {
      return () => {}
    }
    let masked = false
    const sync = (): void => {
      const next = document.querySelector('[aria-modal="true"]') !== null
      if (next === masked) return
      masked = next
      void setTitleBarOverlay(next)
    }
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-modal'],
    })
    sync()
    return () => {
      observer.disconnect()
      if (masked) void setTitleBarOverlay(false)
    }
  }, 'xfzh-theme: desktop caption mask')
}

/**
 * Recolor both built-in palettes, mount the overlay sheet, and occupy the
 * generic brand slots. Not gated on `DSH_CLIENT_BUILD_PROFILE`: this fork
 * always presents as xfzh.
 * @param ctx - Client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(
    () => ctx.theme.overrideTokens('xfzh-theme', XFZH_TOKENS),
    'xfzh-theme: token overlay',
  )
  installXfzhStyles(ctx)
  installXfzhEffects(ctx)
  installXfzhStage(ctx)
  installDesktopCaptionClass(ctx)
  installDesktopCaptionMask(ctx)
  ctx.slots.inject('sidebar.brand.mark', () =>
    ctx.slots.inject('sidebar.brand.name', () =>
      ctx.slots.inject('conversation.hero.brand.mark', () =>
        ctx.slots.inject('conversation.hero.headline', function* () {
          yield ctx.slots.register({ name: 'sidebar.brand.mark' }, XfzhMark)
          yield ctx.slots.register({ name: 'sidebar.brand.name' }, XfzhName)
          yield ctx.slots.register({ name: 'conversation.hero.brand.mark' }, XfzhMark)
          yield ctx.slots.register({ name: 'conversation.hero.headline' }, XfzhHeadline)
        }))))
}

declare global {
  interface Window {
    dshDesktop?: {
      readonly protocolVersion: 1
      setTitleBarOverlay?(masked: boolean): Promise<void>
    }
  }
}
