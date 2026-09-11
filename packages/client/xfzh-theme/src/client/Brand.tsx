import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'

/**
 * Render the xfzh sakura mark at the size requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the sakura mark.
 */
export function XfzhMark({ size, className }: SidebarBrandMarkOwnerProps & Partial<HeroBrandMarkOwnerProps>) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <g fill="currentColor">
        <ellipse cx="12" cy="5.4" rx="3.1" ry="4.1" />
        <ellipse cx="12" cy="5.4" rx="3.1" ry="4.1" transform="rotate(72 12 12)" />
        <ellipse cx="12" cy="5.4" rx="3.1" ry="4.1" transform="rotate(144 12 12)" />
        <ellipse cx="12" cy="5.4" rx="3.1" ry="4.1" transform="rotate(216 12 12)" />
        <ellipse cx="12" cy="5.4" rx="3.1" ry="4.1" transform="rotate(288 12 12)" />
        <circle cx="12" cy="12" r="2.15" />
      </g>
    </svg>
  )
}

/**
 * Render the xfzh wordmark without its independently slotted mark.
 * @returns the xfzh name wordmark.
 */
export function XfzhName() {
  return (
    <svg width="72" height="24" viewBox="0 0 72 24" fill="none" aria-hidden="true">
      <text
        x="0"
        y="17"
        fill="currentColor"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
        fontSize="16"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        xfzh
      </text>
    </svg>
  )
}
