---
description: "Always-on sakura-letter / dusk-room token overlay, stickers, and xfzh brand occupants; for users and maintainers of the xfzh fork."
kind: "package-reference"
---

# @deepseek-ai/dsh-client-xfzh-theme

English | [中文](README.zh.md)

## Summary

This package recolors both built-in Appearance palettes into a sakura-letter light scheme and a dusk-room dark scheme, mounts sticker and radius overlay CSS, and occupies the sidebar and conversation-hero brand slots with the xfzh mark and name. Settings still persist Light / Dark / System. It has no runtime state and does not affect model requests.

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

Unlike `ui-brand-official`, this package is not gated on `DSH_CLIENT_BUILD_PROFILE`. A local or official client build both receive the sakura overlay and the xfzh mark.

### Replacing the overlay

Leave this package out of the roster, or occupy the same brand slots from another package registered later. Token overlays stack by source; a later `overrideTokens` call with the same source replaces this layer.

-----

<a id="understand-the-implementation"></a>
## Understand the implementation

<details>
<summary>Implementation internals — click to expand</summary>

`apply()` stacks `XFZH_TOKENS` through `ctx.theme.overrideTokens('xfzh-theme', …)`, injects `overlay.css` for the plugin lifetime, and occupies the three brand slots as one declaration-aware registration set: nested `ctx.slots.inject()` waits on the sidebar and hero declarations so the set works whether this row activates before or after the declarers. On the Electron app renderer it also marks `html.xfzh-desktop` so the overlay can expose drag regions and leave room for Chromium's window-control overlay. The browser half is [`src/client/index.ts`](src/client/index.ts); the node half is an empty Loader seat. Component CSS in primitives, conversation, chat, sidebar, and layout reads `--dsw-radius-*` and `--xfzh-sticker-*` with official-value fallbacks, so omitting this package restores the upstream look.

</details>

-----

<a id="further-exploration"></a>
## Further Exploration

Read these pages when the overlay is not enough. They move from the tokens this package writes to the surfaces that consume them.

- [ui-theme](../ui-theme/README.md) — owns `overrideTokens` and the Light / Dark / System preference.
- [ui-sidebar](../ui-sidebar/README.md) — declares `sidebar.brand.mark` and `sidebar.brand.name`.
- [ui-conversation](../ui-conversation/README.md) — declares `conversation.hero.brand.mark`.
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

<a id="dev-note"></a>
### Dev Note

<details>
<summary>Working context for maintainers — click to expand</summary>

Phase 1 lands tokens, radius hooks, SVG wash/stickers, and xfzh brand slots. Webfonts, photo wallpapers, and Shiki recolor are out of scope.

</details>

**Runtime invariant:** No companion is published. The package retains no mutable state; the token layer, overlay sheet, and brand occupants install and leave through plugin effects.
