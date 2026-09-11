// @vitest-environment jsdom
import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useSyncExternalStore } from 'react'
import type { SessionId } from '@deepseek-ai/dsh-session/types'
import { SessionLogDownloadController } from '../src/client/controller.ts'
import { SessionLogDownloadHeaderAction } from '../src/client/HeaderAction.tsx'
import type { SessionLogDownloadDialogProps } from '../src/client/Dialog.tsx'
import { en } from '../src/client/locales.ts'

const SID = 'session-export-header' as SessionId

function bindSessionExport(controller: SessionLogDownloadController) {
  return function useSessionLogDownload<T>(selector: (state: ReturnType<typeof controller.store.getSnapshot>) => T): T {
    return useSyncExternalStore(
      listener => controller.store.subscribe(listener),
      () => selector(controller.store.getSnapshot()),
    )
  }
}

function bench(controller = new SessionLogDownloadController(async () => new Response('zip'), vi.fn())) {
  const request = vi.fn((sessionId: SessionId) => controller.download(sessionId))
  const dismiss = vi.fn((sessionId: SessionId) => { controller.dismiss(sessionId) })
  const useSessionLogDownload = bindSessionExport(controller)
  const props = {
    sessionId: SID,
    useSessionLogDownload,
    request,
    dismiss,
    t: (key: keyof typeof en): string => en[key],
  } as unknown as SessionLogDownloadDialogProps
  const view = render(<SessionLogDownloadHeaderAction {...props} />)
  return { controller, request, view }
}

afterEach(cleanup)

describe('Session export Header action', () => {
  it('does not render a Session-log capsule in the header', () => {
    const b = bench()
    expect(b.view.queryByRole('button', { name: 'Session log' })).toBeNull()
  })

  it('opens the shared dialog when /export downloads this Session', async () => {
    const b = bench()
    await b.controller.download(SID)
    expect(await b.view.findByRole('dialog', { name: 'Session download started' })).toBeTruthy()
    expect(b.view.queryByRole('button', { name: 'Session log' })).toBeNull()
  })

  it('stays silent in the header while a download is in flight', async () => {
    let release!: (response: Response) => void
    const pending = new Promise<Response>((resolve) => { release = resolve })
    const controller = new SessionLogDownloadController(() => pending, vi.fn())
    const b = bench(controller)

    const download = controller.download(SID)
    await waitFor(() => {
      expect(b.view.queryByRole('button', { name: 'Session log' })).toBeNull()
      expect(b.view.getByRole('dialog', { name: 'Exporting Session' })).toBeTruthy()
    })
    release(new Response('zip'))
    await download
    await waitFor(() => {
      expect(b.view.getByRole('dialog', { name: 'Session download started' })).toBeTruthy()
    })
  })
})
