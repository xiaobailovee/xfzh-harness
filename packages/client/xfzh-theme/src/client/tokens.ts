/**
 * Cozy-cat / night-latte token overlay. Every entry is a `{ light, dark }`
 * pair so `theme.overrideTokens` never goes illegible on a scheme switch.
 *
 * Dual track: caramel (`BRAND`) is focus, borders, switches, and primary
 * fills. Paw-pink (`PAW`) is send-only via `button-info-fill` — do not pour
 * it into `brand-primary`.
 */
import type { ThemeTokenModes, ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

const PAPER = pair('rgb(250, 247, 242)', 'rgb(28, 22, 18)')
const CARD = pair('rgb(255, 255, 255)', 'rgb(42, 34, 28)')
const LAYER_3 = pair('rgb(247, 242, 235)', 'rgb(48, 38, 32)')
const SIDEBAR = pair('rgb(242, 236, 228)', 'rgb(36, 28, 22)')
const HOVER = pair('rgb(235, 227, 216)', 'rgb(53, 42, 34)')
const SELECTED = pair('rgb(228, 217, 204)', 'rgb(62, 50, 40)')
const BUBBLE = pair('rgb(246, 237, 227)', 'rgb(58, 46, 38)')
const BUBBLE_HIGHLIGHT = pair('rgb(237, 224, 210)', 'rgb(74, 60, 50)')
const BRAND = pair('rgb(196, 139, 96)', 'rgb(212, 165, 116)')
const BRAND_HOVER = pair('rgb(176, 122, 82)', 'rgb(224, 176, 128)')
const PAW = pair('rgb(244, 168, 161)', 'rgb(232, 168, 160)')
const PAW_HOVER = pair('rgb(232, 149, 140)', 'rgb(240, 184, 176)')
const INK = pair('rgb(69, 51, 43)', 'rgb(243, 232, 220)')
const INK_SECONDARY = pair('rgb(142, 123, 112)', 'rgb(196, 176, 160)')
const INK_DIMMED = pair('rgb(181, 164, 152)', 'rgb(138, 118, 104)')
const BUTTON_FG = pair('rgb(255, 251, 250)', 'rgb(28, 22, 18)')
const LINK = pair('rgb(176, 122, 82)', 'rgb(212, 165, 116)')
const SUCCESS = pair('rgb(90, 168, 132)', 'rgb(126, 196, 160)')
const WARN = pair('rgb(232, 164, 74)', 'rgb(240, 184, 96)')
const ERROR = pair('rgb(212, 86, 102)', 'rgb(232, 120, 132)')
const BORDER_SOFT = pair('rgba(196, 139, 96, 0.10)', 'rgba(212, 165, 116, 0.10)')
const BORDER_COOKIE = pair('rgb(232, 223, 213)', 'rgba(212, 165, 116, 0.14)')
const BORDER = pair('rgba(196, 139, 96, 0.18)', 'rgba(212, 165, 116, 0.18)')
const BORDER_STRONG = pair('rgba(196, 139, 96, 0.28)', 'rgba(212, 165, 116, 0.22)')
const MASK = pair('rgba(69, 51, 43, 0.28)', 'rgba(0, 0, 0, 0.55)')
const CODE = pair('rgb(244, 239, 232)', 'rgb(36, 28, 22)')
const SCROLL = pair('rgb(216, 200, 184)', 'rgb(74, 60, 50)')
const SCROLL_HOVER = pair('rgb(196, 176, 156)', 'rgb(90, 74, 62)')
const TOAST = pair('rgb(69, 51, 43)', 'rgb(243, 232, 220)')
const INVERTED = pair('rgb(255, 251, 250)', 'rgb(28, 22, 18)')
const INPUT = pair('rgb(255, 255, 255)', 'rgb(42, 34, 28)')
const SKELETON = pair('rgba(196, 139, 96, 0.08)', 'rgba(255, 255, 255, 0.08)')
const HOVER_WASH = pair('rgba(196, 139, 96, 0.08)', 'rgba(212, 165, 116, 0.10)')
const HOVER_ACCENT = pair('rgba(196, 139, 96, 0.14)', 'rgba(212, 165, 116, 0.16)')
const DANGER_WASH = pair('rgba(212, 86, 102, 0.08)', 'rgba(232, 120, 132, 0.15)')
const BUSINESS_WASH = pair('rgb(242, 236, 228)', 'rgb(62, 50, 40)')
const SHADOW_1 = pair('0 2px 8px rgba(196, 139, 96, 0.08)', '0 8px 24px rgba(0, 0, 0, 0.40)')
const SHADOW_2 = pair('0 6px 18px rgba(196, 139, 96, 0.12)', '0 8px 24px rgba(0, 0, 0, 0.40)')
const SHADOW_3 = pair('0 12px 32px rgba(196, 139, 96, 0.16)', '0 8px 24px rgba(0, 0, 0, 0.40)')
const THINK = pair(
  'linear-gradient(180deg, rgb(250, 247, 242) 20.19%, rgba(250, 247, 242, 0) 100%)',
  'linear-gradient(180deg, rgb(28, 22, 18) 20.19%, rgba(28, 22, 18, 0) 100%)',
)
const THINK_SELECT = pair(
  'linear-gradient(180deg, rgb(242, 236, 228) 20.19%, rgba(242, 236, 228, 0) 100%)',
  'linear-gradient(180deg, rgb(42, 34, 28) 20.19%, rgba(42, 34, 28, 0) 100%)',
)

/**
 * Always-on overlay stacked on the built-in light/dark palettes.
 * Settings still persist `light` / `dark` / `system`; this layer recolors both.
 */
export const XFZH_TOKENS: ThemeTokenOverrides = {
  '--dsw-alias-bg-base': PAPER,
  '--dsw-alias-bg-layer-1': CARD,
  '--dsw-alias-bg-layer-2': CARD,
  '--dsw-alias-bg-layer-3': LAYER_3,
  '--dsw-alias-bg-module-platform': SIDEBAR,
  '--dsw-alias-bg-multi-select': SELECTED,
  '--dsw-alias-bg-overlay': HOVER,
  '--dsw-alias-bg-mask-1': MASK,
  '--dsw-alias-bg-skeleton': SKELETON,
  '--dsw-alias-border-l1': BORDER_SOFT,
  '--dsw-alias-border-l2': BORDER_COOKIE,
  '--dsw-alias-border-l2-darkmode-thin': BORDER_COOKIE,
  '--dsw-alias-border-l3': BORDER,
  '--dsw-alias-border-l4': BORDER_STRONG,
  '--dsw-alias-brand-primary': BRAND,
  '--dsw-alias-brand-primary-invert': INVERTED,
  '--dsw-alias-brand-primary-new-colorprimary-new-color': BRAND,
  '--dsw-alias-brand-text': INK,
  '--dsw-alias-button-contrast-fill': TOAST,
  '--dsw-alias-button-elevated-fill': CARD,
  '--dsw-alias-button-floating-fill': CARD,
  '--dsw-alias-button-floating-hover': HOVER,
  '--dsw-alias-button-ghost-active-border': BRAND,
  '--dsw-alias-button-ghost-active-fill': SELECTED,
  '--dsw-alias-button-ghost-active-hover': HOVER,
  '--dsw-alias-button-info-fill': PAW,
  '--dsw-alias-button-info-hover': PAW_HOVER,
  '--dsw-alias-button-primary-dimmed': SELECTED,
  '--dsw-alias-button-primary-fill': BRAND,
  '--dsw-alias-button-primary-hover': BRAND_HOVER,
  '--dsw-alias-interactive-bg-active': HOVER_ACCENT,
  '--dsw-alias-interactive-bg-hover': HOVER_WASH,
  '--dsw-alias-interactive-bg-hover-accent': HOVER_ACCENT,
  '--dsw-alias-interactive-bg-hover-danger': DANGER_WASH,
  '--dsw-alias-interactive-bg-hover-solid': HOVER,
  '--dsw-alias-label-caption': INK_DIMMED,
  '--dsw-alias-label-dimmed': INK_DIMMED,
  '--dsw-alias-label-primary': INK,
  '--dsw-alias-label-primary-bluish': INK,
  '--dsw-alias-label-primary-dimmed': INK_SECONDARY,
  '--dsw-alias-label-primary-foreground': BUTTON_FG,
  '--dsw-alias-label-primary-inverted': INVERTED,
  '--dsw-alias-label-secondary': INK_SECONDARY,
  '--dsw-alias-label-tertiary': INK_DIMMED,
  '--dsw-alias-link': LINK,
  '--dsw-alias-markdown-citation': SIDEBAR,
  '--dsw-alias-markdown-code-block': CODE,
  '--dsw-alias-markdown-code-block-banner': CODE,
  '--dsw-alias-markdown-code-segment-selected': CARD,
  '--dsw-alias-markdown-code-segment-unselected': CODE,
  '--dsw-alias-markdown-inline-code': CODE,
  '--dsw-alias-markdown-placeholder': SIDEBAR,
  '--dsw-alias-markdown-tag': SIDEBAR,
  '--dsw-alias-scrollbar-bg-l1': SCROLL,
  '--dsw-alias-scrollbar-bg-l2': SCROLL,
  '--dsw-alias-scrollbar-hover-l1': SCROLL_HOVER,
  '--dsw-alias-scrollbar-hover-l2': SCROLL_HOVER,
  '--dsw-alias-state-business-primary': BRAND,
  '--dsw-alias-state-business-tertiary': BUSINESS_WASH,
  '--dsw-alias-state-error-primary': ERROR,
  '--dsw-alias-state-error-secondary': ERROR,
  '--dsw-alias-state-success-primary': SUCCESS,
  '--dsw-alias-state-success-secondary': SUCCESS,
  '--dsw-alias-state-success-tertiary': BUSINESS_WASH,
  '--dsw-alias-state-warn-label': WARN,
  '--dsw-alias-state-warn-primary': WARN,
  '--dsw-alias-state-warn-secondary': WARN,
  '--dsw-alias-state-warn-tertiary': pair('rgb(255, 244, 228)', 'rgb(58, 42, 28)'),
  '--dsw-alias-toast-bg': TOAST,
  '--dsw-alias-tooltip-bg': pair('rgb(69, 51, 43)', 'rgb(62, 50, 40)'),
  '--dsw-alias-tooltip-fg': pair('rgb(250, 247, 242)', 'rgb(243, 232, 220)'),
  '--dsw-specific-bubble': BUBBLE,
  '--dsw-specific-bubble-highlight': BUBBLE_HIGHLIGHT,
  '--dsw-specific-hovercard': pair('rgb(69, 51, 43)', 'rgb(62, 50, 40)'),
  '--dsw-specific-input-major': INPUT,
  '--dsw-specific-login-input': CARD,
  '--dsw-specific-menu': LAYER_3,
  '--dsw-specific-selector': SIDEBAR,
  '--dsw-specific-sidebar-fill': SIDEBAR,
  '--dsw-specific-sidebar-nav-item-active': SELECTED,
  '--dsw-specific-sidebar-nav-item-active-accent': BUBBLE_HIGHLIGHT,
  '--dsw-specific-sidebar-nav-item-hover': HOVER,
  '--dsw-specific-tip': SIDEBAR,
  '--dsw-shadow-lv1': SHADOW_1,
  '--dsw-shadow-lv2': SHADOW_2,
  '--dsw-shadow-lv3': SHADOW_3,
  '--dsw-elevation-stroke-color': BORDER_STRONG,
  '--dsw-linear-gradient-think': THINK,
  '--dsw-linear-think-select': THINK_SELECT,
}

function pair(light: string, dark: string): ThemeTokenModes {
  return { light, dark }
}
