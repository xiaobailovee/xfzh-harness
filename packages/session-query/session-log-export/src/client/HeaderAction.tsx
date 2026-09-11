import type { ReactNode } from 'react'
import { SessionLogDownloadDialog, type SessionLogDownloadDialogProps } from './Dialog.tsx'

/**
 * Mount the Session export result dialog for `/export`.
 * The header no longer shows a Session-log capsule; slash export still needs
 * this occupant so the modal can open against the current session.
 * @param props - Session runtime, download controller, and localized dialog copy.
 * @returns the Session-scoped dialog portal.
 */
export function SessionLogDownloadHeaderAction(props: SessionLogDownloadDialogProps): ReactNode {
  return <SessionLogDownloadDialog {...props} />
}
