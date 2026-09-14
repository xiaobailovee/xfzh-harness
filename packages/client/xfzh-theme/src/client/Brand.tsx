import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'

/**
 * Render the xfzh cat-head mark at the size requested by its host surface.
 * @param props - Host-supplied mark presentation.
 * @returns the cat-head mark.
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
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.2 8.4 6 2.8c-.15-.65.55-1.1 1.1-.8l4.1 3.2c.26-.12.53-.2.8-.2s.54.08.8.2l4.1-3.2c.55-.3 1.25.15 1.1.8l-1.2 5.6c2.6 1.2 4.2 3.6 4.2 6.4 0 4.4-4.03 7.4-9 7.4s-9-3-9-7.4c0-2.8 1.6-5.2 4.2-6.4ZM8.6 13.8c.9 0 1.5-.7 1.5-1.45s-.6-1.45-1.5-1.45-1.5.7-1.5 1.45.6 1.45 1.5 1.45Zm6.8 0c.9 0 1.5-.7 1.5-1.45s-.6-1.45-1.5-1.45-1.5.7-1.5 1.45.6 1.45 1.5 1.45Z"
      />
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
        fontFamily="Jiaotangzi, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
        fontSize="16"
        fontWeight="600"
        letterSpacing="0.08em"
      >
        xfzh
      </text>
    </svg>
  )
}
