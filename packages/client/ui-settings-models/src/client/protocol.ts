/**
 * Hand-declared pi-ai protocol presentation and the per-model reasoning map
 * each protocol needs so the composer can offer the levels the user named.
 *
 * Path suffixes are the request-path fragment shown next to the protocol id
 * in the settings dropdown; they are a hint, not a rewrite of `baseURL`.
 * Reasoning maps are written onto each model from the levels the user typed
 * — one canonical id per line — with wire spellings that protocol understands.
 */

/** One drafted model row: extra fields this helper does not name must survive. */
type ModelDraft = Record<string, unknown>

/** Request-path fragment shown in the protocol dropdown, keyed by protocol id. */
export const PROTOCOL_PATH_SUFFIX: Readonly<Record<string, string>> = {
  'openai-completions': '/chat/completions',
  'openai-responses': '/v1',
  'anthropic-messages': '/v1/messages',
}

/**
 * Every pi-ai thinking level, in canonical escalation order. The user types a
 * subset of these, one per line; undeclared levels are not offered.
 */
export const THINKING_LEVELS = [
  'off', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max',
] as const

const THINKING_LEVEL_SET: ReadonlySet<string> = new Set(THINKING_LEVELS)

/** A plain object draft field, or `undefined` when the value is not one. */
function recordOf(value: unknown): Record<string, unknown> | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return undefined
  return value as Record<string, unknown>
}

/**
 * Protocol dropdown text: the id plus its request-path suffix when we know one.
 * @param protocol - wire protocol id, e.g. `openai-responses`.
 * @returns e.g. `openai-responses (/v1)`.
 */
export function protocolOptionLabel(protocol: string): string {
  const suffix = PROTOCOL_PATH_SUFFIX[protocol]
  return suffix === undefined ? protocol : `${protocol} (${suffix})`
}

/**
 * Wire spelling dispatch sends for one canonical level on this protocol.
 *
 * Completions and Anthropic omit the effort parameter when thinking is off
 * (`null`). Responses sends an explicit `none`. Every other level is sent as
 * its own id (`low`, `xhigh`, `max`, …).
 * @param protocol - the route's chosen wire protocol.
 * @param level - a canonical thinking-level id.
 * @returns the wire value, or `null` when the parameter should be omitted.
 */
export function wireValueForReasoningLevel(protocol: string, level: string): string | null {
  if (level === 'off') return protocol === 'openai-responses' ? 'none' : null
  return level
}

/** Canonical levels currently stored on a row, in the order they were written. */
export function reasoningLevelsOf(model: ModelDraft): string[] {
  const efforts = recordOf(model['reasoningEfforts'])
  if (efforts === undefined) return []
  return Object.keys(efforts).filter(level => THINKING_LEVEL_SET.has(level))
}

/** Textarea contents for a row: one canonical id per line. */
export function reasoningLevelsText(model: ModelDraft): string {
  return reasoningLevelsOf(model).join('\n')
}

/**
 * Parse the reasoning-levels field. Blank means the model does not reason.
 * Each non-empty line must be a known id; duplicates and an `off`-only list
 * are refused because the adapter will not accept them.
 * @param text - raw textarea contents.
 * @returns empty, a unique list of canonical ids, or invalid.
 */
export function parseReasoningLevelLines(
  text: string,
): { kind: 'empty' } | { kind: 'ok'; levels: string[] } | { kind: 'invalid' } {
  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0)
  if (lines.length === 0) return { kind: 'empty' }
  const levels: string[] = []
  const seen = new Set<string>()
  for (const line of lines) {
    const id = line.toLowerCase()
    if (!THINKING_LEVEL_SET.has(id) || seen.has(id)) return { kind: 'invalid' }
    seen.add(id)
    levels.push(id)
  }
  if (!levels.some(level => level !== 'off')) return { kind: 'invalid' }
  return { kind: 'ok', levels }
}

/** Whether this row currently claims image input. */
export function modelAcceptsImages(model: ModelDraft): boolean {
  const input = model['input']
  return Array.isArray(input) && input.includes('image')
}

/**
 * Drop `forceAdaptiveThinking` this card may have written, leaving any other
 * compat fields the profile already carried.
 * @param model - a row that may hold a compat block.
 * @returns the row without that switch, and without an empty compat object.
 */
function withoutAdaptiveThinking(model: ModelDraft): ModelDraft {
  const compat = recordOf(model['compat'])
  if (compat === undefined || !('forceAdaptiveThinking' in compat)) return model
  const { forceAdaptiveThinking: _dropped, ...rest } = compat
  if (Object.keys(rest).length === 0) {
    const next = { ...model }
    delete next['compat']
    return next
  }
  return { ...model, compat: rest }
}

/** Remove reasoning fields this card may have written. */
function withoutReasoning(model: ModelDraft): ModelDraft {
  const cleared = withoutAdaptiveThinking(model)
  if (!('reasoningEfforts' in cleared)) return cleared
  const next = { ...cleared }
  delete next['reasoningEfforts']
  return next
}

/**
 * Turn image input on or off for one row. Off omits `input` so the adapter
 * keeps its text-only default rather than storing `['text']`.
 * @param model - the drafted row.
 * @param enabled - whether the model accepts images.
 * @returns a new row with `input` set or removed.
 */
export function applyImageInput(model: ModelDraft, enabled: boolean): ModelDraft {
  if (enabled) return { ...model, input: ['text', 'image'] }
  if (!('input' in model)) return model
  const next = { ...model }
  delete next['input']
  return next
}

/**
 * Write the user's typed thinking levels onto a row, with wire spellings this
 * protocol understands. An empty field drops reasoning; an unreadable field
 * stores an empty dict so save-time validation can name the row.
 * @param model - the drafted row.
 * @param protocol - the route's chosen wire protocol.
 * @param text - raw textarea contents, one id per line.
 * @returns a new row with reasoning fields set, cleared, or marked invalid.
 */
export function applyReasoningLevels(
  model: ModelDraft,
  protocol: string,
  text: string,
): ModelDraft {
  const parsed = parseReasoningLevelLines(text)
  if (parsed.kind === 'empty') return withoutReasoning(model)
  if (parsed.kind === 'invalid') {
    return { ...withoutAdaptiveThinking(model), reasoningEfforts: {} }
  }
  const reasoningEfforts: Record<string, string | null> = {}
  for (const level of parsed.levels) {
    reasoningEfforts[level] = wireValueForReasoningLevel(protocol, level)
  }
  const withEfforts: ModelDraft = { ...model, reasoningEfforts }
  if (protocol === 'anthropic-messages') {
    return {
      ...withEfforts,
      compat: { ...recordOf(withEfforts['compat']) ?? {}, forceAdaptiveThinking: true },
    }
  }
  return withoutAdaptiveThinking(withEfforts)
}

/**
 * Whether a stored `reasoningEfforts` value will be refused by the adapter.
 * Absent means inherit/no-reasoning and is accepted; `false` disables
 * reasoning and is accepted; an empty dict, unknown keys, or off-only are not.
 * @param model - the drafted row.
 * @returns true when the field is present and unusable.
 */
export function reasoningEffortsAreInvalid(model: ModelDraft): boolean {
  if (!('reasoningEfforts' in model)) return false
  const efforts = model['reasoningEfforts']
  if (efforts === false) return false
  const record = recordOf(efforts)
  if (record === undefined) return true
  const levels = Object.keys(record)
  if (levels.length === 0) return true
  if (levels.some(level => !THINKING_LEVEL_SET.has(level))) return true
  return !levels.some(level => level !== 'off')
}

/**
 * Rewrite every reasoning-enabled row to the maps the new protocol speaks,
 * keeping the levels the user already named. Rows that never opted in stay
 * untouched, including their image/capacity fields. An invalid empty dict is
 * left as-is so the row still fails validation.
 * @param models - the drafted catalog.
 * @param protocol - the protocol the route is switching to.
 * @returns a new array, or the same one when nothing had reasoning.
 */
export function remapModelsReasoning(
  models: readonly ModelDraft[],
  protocol: string,
): ModelDraft[] {
  let changed = false
  const next = models.map((model) => {
    const levels = reasoningLevelsOf(model)
    if (levels.length === 0) return model
    changed = true
    return applyReasoningLevels(model, protocol, levels.join('\n'))
  })
  return changed ? next : [...models]
}
