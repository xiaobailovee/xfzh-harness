---
description: "Always-on cozy-cat / night-latte token overlay, stickers, and xfzh brand occupants; for users and maintainers of the xfzh fork."
kind: "package-reference"
---

# @deepseek-ai/dsh-client-xfzh-theme

English | [中文](README.zh.md)

## Summary

This package recolors Light into cozy-cat latte and Dark into night-latte, paints an illustrated cafe scene in the conversation column, and occupies sidebar and hero brand slots with the xfzh cat-head mark. The blank-session headline is the fixed xfzh line; omitting the package restores `hero.headline`. Jiaotangzi is the display face; colorful iconfont stickers stay decorative. Caramel is the global primary; paw-pink is send-only. Settings still persist Light / Dark / System. It has no runtime state and does not affect model requests.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Further Exploration](#further-exploration)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

Mount this plugin in the browser roster after `ui-brand-official` so the xfzh occupants win the brand slots. The overlay is always on: there is no fourth Appearance cube and no `theme.register` id.

### Choosing the profile

Unlike `ui-brand-official`, this package is not gated on `DSH_CLIENT_BUILD_PROFILE`. A local or official client build both receive the cat-latte overlay and the xfzh mark.

### Replacing the overlay

Leave this package out of the roster, or occupy the same brand slots from another package registered later. Token overlays stack by source; a later `overrideTokens` call with the same source replaces this layer.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

`apply()` stacks `XFZH_TOKENS` through `ctx.theme.overrideTokens('xfzh-theme', …)`, injects `webfonts.ts` plus `overlay.css` for the plugin lifetime, mounts the colorful iconfont SVG sprite, sprinkles original-color glyphs and a click burst, seats cafe wallpaper plus sidebar chrome (cat-ear corners, chibi mascot) from [`src/client/art.ts`](src/client/art.ts), and occupies the brand slots plus `conversation.hero.headline` as one declaration-aware registration set: nested `ctx.slots.inject()` waits on the sidebar and hero declarations so the set works whether this row activates before or after the declarers. The headline occupant is the fixed xfzh line. On the Electron app renderer it also marks `html.xfzh-desktop` so the overlay can expose drag regions and leave room for Chromium's window-control overlay. The browser half is [`src/client/index.ts`](src/client/index.ts); the node half is an empty Loader seat. Component CSS in primitives, conversation, chat, sidebar, and layout reads `--dsw-radius-*` and `--xfzh-sticker-*` with official-value fallbacks, so omitting this package restores the upstream look. `overlay.css` is inlined; Jiaotangzi ships as a data-URL `@font-face` from [`scripts/embed-fonts.py`](scripts/embed-fonts.py); colorful stickers come from [`scripts/embed-icons.py`](scripts/embed-icons.py); illustrated WebP art comes from [`scripts/embed-images.py`](scripts/embed-images.py) so tsdown never has to emit woff2, SVG, or image files.

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

Read these pages when the overlay is not enough. They move from the tokens this package writes to the surfaces that consume them.

- [ui-theme](../ui-theme/README.md) — owns `overrideTokens` and the Light / Dark / System preference.
- [ui-sidebar](../ui-sidebar/README.md) — declares `sidebar.brand.mark` and `sidebar.brand.name`.
- [ui-conversation](../ui-conversation/README.md) — declares `conversation.hero.brand.mark` and `conversation.hero.headline`.
- [ui-brand-official](../ui-brand-official/README.md) — official occupants this package shades by registering later.

-----

<a id="model-experience"></a>
## Model Experience

None, as the package contributes browser presentation only; nothing here reaches a model request.

#### KV Cache effect

None; this package neither assembles nor sends a provider request.

## Known Limitations and Deferred Work

<a id="known-limitations-and-deferred-work"></a>


These limits define how the overlay is supplied. They are current package constraints, not a theme-design comparison or a task backlog.

- **No fourth Appearance cube** — the overlay recolors the two built-in palettes; custom theme ids cannot persist in `ui-theme` settings.
- **First paint may flash official colors** — boot CSS only knows light/dark; this plugin overlays after load.
- **Bubble stickers stay off** — `--xfzh-sticker-bubble` defaults to `none` so message lists stay quiet.
- **Jiaotangzi is a UI subset** — the 11.5MB source TTF is not bundled; `jiaotangzi.woff2` covers locale CJK plus Latin. Chat transcripts still fall back to the system stack for rare glyphs.
- **Iconfont is decorative and keeps its original colors** — stickers, sprinkle, and click bursts use the colorful SVG symbols from `iconfont.js`, not a caramel-tinted font glyph. New Session, settings, folders, and the send arrow stay official 16px line icons.
- **Cafe wallpaper is always on** — scene art, sidebar cat-ear corners, and the sidebar mascot unload with the plugin. The `role.png` model sheet is not bundled.

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

The overlay lands tokens (caramel primary, paw-pink send), Jiaotangzi, colorful iconfont stickers and click bursts, cafe wallpaper plus sidebar chrome, xfzh brand slots, and the fixed hero headline. After replacing `src/assets/fonts/jiaotangzi.ttf`, or after changing headline copy in `src/client/locales.ts`, rerun `python packages/client/xfzh-theme/scripts/embed-fonts.py`. After replacing `src/assets/icons/iconfont.js`, rerun `python packages/client/xfzh-theme/scripts/embed-icons.py`. After replacing files in `src/assets/images/` (except `role.png`), rerun `python packages/client/xfzh-theme/scripts/embed-images.py`. Shiki recolor stays out of scope.

</details>

**Runtime invariant:** No companion is published. The package retains no mutable state; the token layer, overlay sheet, and brand occupants install and leave through plugin effects.
