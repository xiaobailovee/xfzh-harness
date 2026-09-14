import { describe, expect, it } from 'vitest'
import {
  applicationMenuBarVisible,
  customCaptionWindowOptions,
  titleBarOverlayOptions,
} from '../src/window-chrome.ts'

describe('desktop custom caption', () => {
  it('hides the native caption strip and keeps a system window-control overlay', () => {
    expect(customCaptionWindowOptions()).toEqual({
      frame: true,
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#F2ECE4',
        symbolColor: '#45332B',
        height: 44,
      },
      autoHideMenuBar: !applicationMenuBarVisible(),
    })
    expect(applicationMenuBarVisible('win32')).toBe(false)
    expect(applicationMenuBarVisible('linux')).toBe(false)
    expect(applicationMenuBarVisible('darwin')).toBe(true)
  })

  it('dims the overlay to the masked sidebar fill while a page mask is up', () => {
    expect(titleBarOverlayOptions(true)).toEqual({
      color: '#C1B8B0',
      symbolColor: '#45332B',
      height: 44,
    })
    expect(titleBarOverlayOptions(false).color).toBe('#F2ECE4')
  })
})
