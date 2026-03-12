# Download Plus - Chrome 下载管理扩展 (Manifest V3)

## 中文说明

Download Plus 是一款优秀的 Chrome 下载管理扩展，提供下载进度追踪、完成通知、媒体嗅探等实用功能。

> **声明**：本人非常喜欢这款插件，但由于原作者已停止更新，Chrome 也不再支持 Manifest V2 扩展，导致插件被禁用无法使用。为了能继续使用这款优秀的工具，我对其进行了 **Manifest V2 → V3 的适配迁移**，使其能在新版 Chrome 上正常运行。所有权利归原作者所有。

**原作者主页**：[https://downloadplus.chromiums.org](https://downloadplus.chromiums.org/index.html)

### 功能特性

- 📥 **下载进度追踪** — 扩展图标实时显示下载进度
- 🔔 **下载完成通知** — 可自定义的完成提醒
- 🎬 **媒体嗅探 (Media Finder)** — 自动检测并下载网页中的音频/视频
- 📋 **下载管理弹窗** — 无需打开 `chrome://downloads` 即可管理下载
- 🔕 **隐藏 Chrome 下载气泡** — 使用原生 `setUiOptions` API
- 🌐 **多语言支持** — 支持 30+ 种语言

### 安装方法

1. 下载或克隆本仓库
2. 打开 Chrome，进入 `chrome://extensions/`
3. 开启右上角 **开发者模式**
4. 点击 **「加载已解压的扩展程序」**
5. 选择本项目文件夹

### 已知限制

| 功能 | 状态 | 说明 |
| --- | --- | --- |
| 下载完成提示音 🔊 | ⚠️ 不可用 | Service Worker 中无法使用 `Audio` API |
| Google Analytics | ❌ 已移除 | 追踪代码已完全清除 |
| Google+ 自动点赞 | ❌ 已移除 | 不当行为代码已清除 |
| Facebook 点赞按钮 | ❌ 已移除 | 设置页中的外部 iframe 已清除 |

### V2 → V3 主要变更

| 原 V2 API | 迁移后 V3 API |
| --- | --- |
| Background scripts | Service Worker |
| `chrome.browserAction` | `chrome.action` |
| `chrome.tabs.executeScript` | `chrome.scripting.executeScript` |
| `chrome.extension.getURL` | `chrome.runtime.getURL` |
| `chrome.extension.getBackgroundPage` | `chrome.runtime.sendMessage` |
| `chrome.downloads.setShelfEnabled` | `chrome.downloads.setUiOptions` |
| `localStorage` (同步) | `chrome.storage.local` + Proxy 代理 |

#### 新增文件

| 文件 | 用途 |
| --- | --- |
| `service-worker.js` | Service Worker 入口，替代原 background page |
| `js/v3-compat.js` | 兼容层：localStorage 代理、DOM 桩函数、GA 桩函数 |

---

# Download Plus - Chrome Extension (Manifest V3)

## English

A Chrome download manager extension with download notifications, progress tracking, media finder, and more.

> **Disclaimer**: This is a community-maintained fork migrated from Manifest V2 to V3. The original extension is no longer updated by its author, and has been disabled by Chrome due to MV2 deprecation. This migration was made solely to continue using this excellent tool. All rights belong to the original author.

**Original Author**: [https://downloadplus.chromiums.org](https://downloadplus.chromiums.org/index.html)

### Features

- 📥 **Download Progress Tracking** — Real-time download progress on the extension icon
- 🔔 **Download Notifications** — Customizable completion notifications
- 🎬 **Media Finder** — Detect and download audio/video from web pages
- 📋 **Download Manager Popup** — Manage downloads without opening `chrome://downloads`
- 🔕 **Hide Chrome Download Bubble** — Uses native `setUiOptions` API
- 🌐 **Multi-language Support** — 30+ languages

### Installation

1. Download or clone this repository
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **"Load unpacked"**
5. Select this project folder

### Known Limitations

| Feature | Status | Notes |
| --- | --- | --- |
| Notification Sound 🔊 | ⚠️ Unavailable | `Audio` API not available in Service Workers |
| Google Analytics | ❌ Removed | Tracking code fully stripped |
| Google+ Auto-like | ❌ Removed | Inappropriate behavior code removed |
| Facebook Like Button | ❌ Removed | External iframes removed from settings |

### V2 → V3 Migration

| V2 | V3 |
| --- | --- |
| Background scripts | Service Worker |
| `chrome.browserAction` | `chrome.action` |
| `chrome.tabs.executeScript` | `chrome.scripting.executeScript` |
| `chrome.extension.getURL` | `chrome.runtime.getURL` |
| `chrome.extension.getBackgroundPage` | `chrome.runtime.sendMessage` |
| `chrome.downloads.setShelfEnabled` | `chrome.downloads.setUiOptions` |
| `localStorage` (sync) | `chrome.storage.local` via Proxy shim |

#### New Files

| File | Purpose |
| --- | --- |
| `service-worker.js` | Service Worker entry point |
| `js/v3-compat.js` | Compatibility shim: localStorage proxy, DOM stubs, GA stubs |

## License

This project is provided as-is for personal use. Original extension by the Download Plus team.
