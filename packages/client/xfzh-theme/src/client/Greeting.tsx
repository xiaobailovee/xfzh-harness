import { XFZH_HEADLINE } from './locales.ts'

/**
 * Fixed blank-session headline that occupies the hero copy slot.
 * @returns the headline span.
 */
export function XfzhHeadline() {
  return <span data-hero-headline="">{XFZH_HEADLINE}</span>
}
