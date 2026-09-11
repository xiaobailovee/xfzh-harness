import type { Context } from '@deepseek-ai/cordis'
import overlay from './overlay.css?inline'

const PLUGIN_ID = '@deepseek-ai/dsh-client-xfzh-theme'

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
    tag.textContent = overlay
    document.head.appendChild(tag)
    return () => { tag.remove() }
  }, 'xfzh-theme: overlay stylesheet')
}
