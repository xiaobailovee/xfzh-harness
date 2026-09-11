/** Minimal marker that selects the desktop custom-protocol API carrier. */

import { contextBridge, ipcRenderer } from 'electron'
import { DESKTOP_IPC } from './ipc.ts'

contextBridge.exposeInMainWorld('dshDesktop', {
  protocolVersion: 1,
  setTitleBarOverlay: (masked: boolean) => ipcRenderer.invoke(DESKTOP_IPC.titleBarOverlay, masked),
})
