---
description: "常驻暖阳猫咖 / 夜猫拿铁 token 覆盖、贴纸与 xfzh 品牌填充；供 xfzh 分支的用户与维护者阅读。"
kind: "package-reference"
---

# @deepseek-ai/dsh-client-xfzh-theme

[English](README.md) | 中文

## 概述

本包把浅色盘改成暖阳猫咖、深色盘改成夜猫拿铁，在对话区铺咖啡馆场景，并用 xfzh 猫头标志占据侧栏和英雄区品牌槽。空白会话标题是固定的 xfzh 一句；拿掉本包即恢复 `hero.headline`。焦糖体是展示字体；彩色 iconfont 贴纸只作装饰。焦糖是全局主色；肉垫粉只走发送钮。设置仍持久化浅色 / 深色 / 跟随系统。本包不保留运行时状态，也不影响模型请求。

## 目录

- [使用本包](#use-this-package)
- [理解实现](#understand-the-implementation)
- [进一步探索](#further-exploration)
- [模型体验](#model-experience)
- [已知限制与延期工作](#known-limitations-and-deferred-work)
- [开发备注](#dev-note)

-----

<a id="use-this-package"></a>
## 使用本包

在浏览器名单里把本插件挂在 `ui-brand-official` **后面**，让 xfzh 填充赢得品牌槽。覆盖是常驻的：没有第四个外观方块，也不调用 `theme.register`。

### 选择 profile

与 `ui-brand-official` 不同，本包不受 `DSH_CLIENT_BUILD_PROFILE` 门控。本地构建与官方构建都会得到猫咖覆盖和 xfzh 标志。

### 替换覆盖

把本包从名单里拿掉，或由更晚注册的包占据相同品牌槽。token 覆盖按 source 叠层；同一 source 的后续 `overrideTokens` 会整层替换。

-----

<a id="understand-the-implementation"></a>
## 理解实现

<details>
<summary>实现内部细节——点击展开</summary>

`apply()` 通过 `ctx.theme.overrideTokens('xfzh-theme', …)` 叠上 `XFZH_TOKENS`，在插件生命周期内注入 `webfonts.ts` 与 `overlay.css`，挂上带原色的 iconfont SVG sprite，撒上原色字形和点击散花，从 [`src/client/art.ts`](src/client/art.ts) 坐下咖啡馆壁纸和侧栏装饰（猫耳角、Q 版），并以一组声明感知的注册占据品牌槽和 `conversation.hero.headline`：嵌套的 `ctx.slots.inject()` 等待侧栏和英雄区声明，因此无论本行在声明者之前还是之后激活都能装上。标题占用者是固定的 xfzh 一句。在 Electron 应用渲染器里还会给 `html` 加上 `xfzh-desktop`，让覆盖 CSS 能划出拖动区和系统窗口按钮的留白。浏览器半边是 [`src/client/index.ts`](src/client/index.ts)；节点半边是空的 Loader 座位。原语、对话、聊天、侧栏与布局的组件 CSS 用官方原值作为 fallback 读取 `--dsw-radius-*` 和 `--xfzh-sticker-*`，拿掉本包即恢复上游外观。`overlay.css` 走 inline；焦糖体由 [`scripts/embed-fonts.py`](scripts/embed-fonts.py) 写成 data-URL `@font-face`；彩色贴纸由 [`scripts/embed-icons.py`](scripts/embed-icons.py) 抽出；插画 WebP 由 [`scripts/embed-images.py`](scripts/embed-images.py) 抽出，避免 tsdown 去 emit woff2、SVG 或图片。

</details>

-----

<a id="further-exploration"></a>
## 进一步探索

覆盖不够时读这些页面。它们从本包写入的 token 走到消费它们的表面。

- [ui-theme](../ui-theme/README.zh.md) — 拥有 `overrideTokens` 以及浅色 / 深色 / 跟随系统偏好。
- [ui-sidebar](../ui-sidebar/README.zh.md) — 声明 `sidebar.brand.mark` 与 `sidebar.brand.name`。
- [ui-conversation](../ui-conversation/README.zh.md) — 声明 `conversation.hero.brand.mark` 与 `conversation.hero.headline`。
- [ui-brand-official](../ui-brand-official/README.zh.md) — 本包通过更晚注册覆盖的官方填充。

-----

<a id="model-experience"></a>
## 模型体验

无；本包只贡献浏览器呈现，没有任何内容进入模型请求。

#### KV Cache effect

无；本包既不组装也不发送提供方请求。

## 已知限制与延期工作

<a id="known-limitations-and-deferred-work"></a>


这些限制界定了覆盖的供给方式。它们是当前包约束，不是主题设计对比或任务积压。

- **没有第四个外观方块** — 覆盖改的是两个内置盘；自定义主题 id 无法写入 `ui-theme` 设置。
- **第一屏可能闪官方色** — 启动 CSS 只认识浅/深；本插件加载后才 overlay。
- **气泡贴纸默认关闭** — `--xfzh-sticker-bubble` 默认为 `none`，避免消息列表刷屏。
- **焦糖体是 UI 子集** — 11.5MB 源 TTF 不进包；`jiaotangzi.woff2` 覆盖 locale 汉字和拉丁。对话正文遇到生僻字仍回落到系统栈。
- **Iconfont 只作装饰且保留原色** — 贴纸、背景点缀和点击散花用 `iconfont.js` 里的彩色 SVG 符号，不用焦糖色去盖。新会话、设置、文件夹和发送箭头仍是官方 16px 线稿。
- **咖啡馆壁纸常驻** — 场景图、侧栏猫耳角和 Q 版随插件卸载。定妆图 `role.png` 不进包。

<a id="dev-note"></a>
### 开发备注

<details>
<summary>维护者的工作上下文——点击展开</summary>

覆盖落地 token（焦糖主色、肉垫粉发送）、焦糖体、带原色的 iconfont 贴纸与点击散花、咖啡馆壁纸与侧栏装饰、xfzh 品牌槽，以及固定的英雄标题。替换 `src/assets/fonts/jiaotangzi.ttf`，或改过 `src/client/locales.ts` 里的标题文案后，重跑 `python packages/client/xfzh-theme/scripts/embed-fonts.py`。替换 `src/assets/icons/iconfont.js` 后重跑 `python packages/client/xfzh-theme/scripts/embed-icons.py`。替换 `src/assets/images/` 里的图（`role.png` 除外）后重跑 `python packages/client/xfzh-theme/scripts/embed-images.py`。Shiki 改色仍不在范围内。

</details>

**运行时不变式：** 不发布伴生入口。本包不保留可变状态；token 层、覆盖表和品牌填充通过插件 effect 安装和释放。
