/** Caption options for the renderer-owned main window. */

export const TITLE_BAR_OVERLAY_HEIGHT = 44

/** Idle overlay: the latte sidebar fill, matching the conversation header. */
export const TITLE_BAR_OVERLAY_IDLE = {
  color: '#F2ECE4',
  symbolColor: '#45332B',
  height: TITLE_BAR_OVERLAY_HEIGHT,
} as const

/**
 * Overlay while a page mask is up. Chromium paints the controls above the
 * web view, so the CSS mask never tints them; this is `#F2ECE4` composited
 * with the light mask `rgba(69, 51, 43, 0.28)`.
 */
export const TITLE_BAR_OVERLAY_MASKED = {
  color: '#C1B8B0',
  symbolColor: '#45332B',
  height: TITLE_BAR_OVERLAY_HEIGHT,
} as const

export type TitleBarOverlayOptions = {
  readonly color: string
  readonly symbolColor: string
  readonly height: number
}

/** Overlay colors for the idle chrome or a dimmed modal mask. */
export function titleBarOverlayOptions(masked = false): TitleBarOverlayOptions {
  return masked ? TITLE_BAR_OVERLAY_MASKED : TITLE_BAR_OVERLAY_IDLE
}

/**
 * BrowserWindow extras that hide the native caption strip and keep Windows
 * window controls as a system overlay, the same pattern ZCode uses.
 * The overlay is drawn by Chromium, so minimize / maximize / close stay
 * available even when the web UI fails to paint. The plugin-manager window
 * keeps the default framed chrome.
 */
export function customCaptionWindowOptions(): {
  readonly frame: true
  readonly titleBarStyle: 'hidden'
  readonly titleBarOverlay: TitleBarOverlayOptions
  readonly autoHideMenuBar: boolean
} {
  return {
    frame: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: titleBarOverlayOptions(false),
    autoHideMenuBar: !applicationMenuBarVisible(),
  }
}

/**
 * Whether the application menu should remain a visible window strip.
 * macOS keeps the system menu bar; Windows/Linux hide the in-window strip
 * (Alt still reveals it) because that strip was the second chrome row.
 */
export function applicationMenuBarVisible(platform = process.platform): boolean {
  return platform === 'darwin'
}
