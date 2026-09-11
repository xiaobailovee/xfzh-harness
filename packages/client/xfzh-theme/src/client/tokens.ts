/**
 * Sakura-letter / dusk-room token overlay. Every entry is a `{ light, dark }`
 * pair so `theme.overrideTokens` never goes illegible on a scheme switch.
 */
import type { ThemeTokenModes, ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

const PAPER = pair('rgb(255, 247, 244)', 'rgb(31, 24, 30)')
const CARD = pair('rgb(255, 251, 250)', 'rgb(42, 32, 40)')
const LAYER_3 = pair('rgb(255, 242, 245)', 'rgb(48, 36, 46)')
const SIDEBAR = pair('rgb(255, 236, 240)', 'rgb(38, 28, 36)')
const HOVER = pair('rgb(255, 228, 234)', 'rgb(58, 44, 54)')
const SELECTED = pair('rgb(253, 214, 224)', 'rgb(72, 52, 64)')
const BUBBLE = pair('rgb(253, 226, 232)', 'rgb(74, 53, 64)')
const BUBBLE_HIGHLIGHT = pair('rgb(250, 196, 210)', 'rgb(92, 64, 78)')
const BRAND = pair('rgb(217, 107, 138)', 'rgb(242, 167, 184)')
const BRAND_HOVER = pair('rgb(196, 86, 118)', 'rgb(232, 140, 164)')
const INK = pair('rgb(61, 44, 50)', 'rgb(246, 232, 236)')
const INK_SECONDARY = pair('rgb(110, 82, 92)', 'rgb(214, 186, 196)')
const INK_DIMMED = pair('rgb(176, 148, 156)', 'rgb(156, 128, 138)')
const BUTTON_FG = pair('rgb(255, 251, 250)', 'rgb(31, 24, 30)')
const LINK = pair('rgb(196, 86, 118)', 'rgb(242, 167, 184)')
const SUCCESS = pair('rgb(90, 168, 132)', 'rgb(126, 196, 160)')
const WARN = pair('rgb(232, 164, 74)', 'rgb(240, 184, 96)')
const ERROR = pair('rgb(212, 86, 102)', 'rgb(232, 120, 132)')
const BORDER = pair('rgba(217, 107, 138, 0.18)', 'rgba(242, 167, 184, 0.16)')
const BORDER_SOFT = pair('rgba(217, 107, 138, 0.10)', 'rgba(242, 167, 184, 0.10)')
const BORDER_STRONG = pair('rgba(217, 107, 138, 0.28)', 'rgba(242, 167, 184, 0.24)')
const MASK = pair('rgba(61, 44, 50, 0.28)', 'rgba(0, 0, 0, 0.55)')
const CODE = pair('rgb(252, 246, 247)', 'rgb(36, 28, 34)')
const SCROLL = pair('rgb(244, 200, 210)', 'rgb(92, 64, 78)')
const SCROLL_HOVER = pair('rgb(232, 176, 190)', 'rgb(110, 78, 94)')
const TOAST = pair('rgb(61, 44, 50)', 'rgb(255, 251, 250)')
const INVERTED = pair('rgb(255, 251, 250)', 'rgb(31, 24, 30)')
const INPUT = pair('rgb(255, 255, 255)', 'rgb(42, 32, 40)')
const SKELETON = pair('rgba(217, 107, 138, 0.08)', 'rgba(255, 255, 255, 0.08)')
const HOVER_WASH = pair('rgba(217, 107, 138, 0.08)', 'rgba(242, 167, 184, 0.10)')
const HOVER_ACCENT = pair('rgba(217, 107, 138, 0.14)', 'rgba(242, 167, 184, 0.16)')
const DANGER_WASH = pair('rgba(212, 86, 102, 0.08)', 'rgba(232, 120, 132, 0.15)')
const BUSINESS_WASH = pair('rgb(255, 236, 240)', 'rgb(72, 52, 64)')
const SHADOW_1 = pair('0 2px 8px rgba(217, 107, 138, 0.08)', '0 8px 24px rgba(0, 0, 0, 0.40)')
const SHADOW_2 = pair('0 6px 18px rgba(217, 107, 138, 0.12)', '0 8px 24px rgba(0, 0, 0, 0.40)')
const SHADOW_3 = pair('0 12px 32px rgba(217, 107, 138, 0.16)', '0 8px 24px rgba(0, 0, 0, 0.40)')
const THINK = pair(
  'linear-gradient(180deg, rgb(255, 247, 244) 20.19%, rgba(255, 247, 244, 0) 100%)',
  'linear-gradient(180deg, rgb(31, 24, 30) 20.19%, rgba(31, 24, 30, 0) 100%)',
)
const THINK_SELECT = pair(
  'linear-gradient(180deg, rgb(255, 236, 240) 20.19%, rgba(255, 236, 240, 0) 100%)',
  'linear-gradient(180deg, rgb(42, 32, 40) 20.19%, rgba(42, 32, 40, 0) 100%)',
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
  '--dsw-alias-border-l2': BORDER,
  '--dsw-alias-border-l2-darkmode-thin': BORDER,
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
  '--dsw-alias-button-info-fill': BRAND,
  '--dsw-alias-button-info-hover': BRAND_HOVER,
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
  '--dsw-alias-state-warn-tertiary': pair('rgb(255, 236, 220)', 'rgb(58, 40, 28)'),
  '--dsw-alias-toast-bg': TOAST,
  '--dsw-alias-tooltip-bg': pair('rgb(61, 44, 50)', 'rgb(72, 52, 64)'),
  '--dsw-alias-tooltip-fg': pair('rgb(255, 251, 250)', 'rgb(246, 232, 236)'),
  '--dsw-specific-bubble': BUBBLE,
  '--dsw-specific-bubble-highlight': BUBBLE_HIGHLIGHT,
  '--dsw-specific-hovercard': pair('rgb(61, 44, 50)', 'rgb(72, 52, 64)'),
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
