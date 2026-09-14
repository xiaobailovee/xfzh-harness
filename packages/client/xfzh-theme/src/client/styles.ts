import type { Context } from '@deepseek-ai/cordis'
import { XFZH_ART } from './art.ts'
import overlay from './overlay.css?inline'
import webfonts from './webfonts.ts'
import { XFZH_STICKER_URL } from './icon-urls.ts'

const PLUGIN_ID = '@deepseek-ai/dsh-client-xfzh-theme'

function cssUrl(value: string): string {
  return `url("${value}")`
}

const STICKER_VARS = [
  '--xfzh-sticker-app: none;',
  '--xfzh-sticker-sidebar: none;',
  `--xfzh-sticker-composer: ${XFZH_STICKER_URL.composer};`,
  `--xfzh-sticker-modal: ${XFZH_STICKER_URL.modal};`,
  `--xfzh-sticker-new-session: ${XFZH_STICKER_URL.newSession};`,
  `--xfzh-sticker-header: ${XFZH_STICKER_URL.header};`,
  `--xfzh-bg-image: ${cssUrl(XFZH_ART.sceneLight)};`,
  `--xfzh-art-corner: ${cssUrl(XFZH_ART.corner)};`,
].join('\n  ')

const ART_DARK_VARS = [
  `--xfzh-bg-image: ${cssUrl(XFZH_ART.sceneDark)};`,
].join('\n  ')

/**
 * Mount the xfzh overlay sheet for exactly the owning plugin lifetime.
 * @param ctx - Owning plugin context.
 */
export function installXfzhStyles(ctx: Context): void {
  /* v8 ignore next -- needs a documentless run, not constructible under jsdom */
  if (typeof document === 'undefined') return
  ctx.effect(() => {
    const tag = document.createElement('style')
    tag.dataset.plugin = PLUGIN_ID
    tag.dataset.pluginCss = `${PLUGIN_ID}/overlay.css`
    tag.textContent = [
      webfonts,
      `body {\n  ${STICKER_VARS}\n}`,
      `body[data-ds-dark-theme] {\n  ${ART_DARK_VARS}\n}`,
      overlay,
    ].join('\n')
    document.head.appendChild(tag)
    return () => { tag.remove() }
  }, 'xfzh-theme: overlay stylesheet')
}
