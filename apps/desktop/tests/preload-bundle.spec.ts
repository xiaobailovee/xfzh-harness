import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const desktop = join(dirname(fileURLToPath(import.meta.url)), '..')

describe('sandboxed preload bundles', () => {
  it('builds each preload as its own CJS entry so ipc is not a sibling chunk', () => {
    const source = readFileSync(join(desktop, 'tsdown.config.ts'), 'utf8')
    expect(source).toContain("entry: { preload: 'lib/types/preload.js' }")
    expect(source).toContain("entry: { 'preload-app': 'lib/types/preload-app.js' }")
    expect(source).not.toMatch(/entry:\s*\{[^{}]*preload:[^{}]*preload-app/u)
  })

  it('inlines ipc channel names into the built preload-app script', () => {
    const source = readFileSync(join(desktop, 'lib/preload-app.cjs'), 'utf8')
    expect(source).toContain('dsh-desktop:titlebar-overlay')
    expect(source).not.toMatch(/require\("\.\/ipc-/u)
  })
})
