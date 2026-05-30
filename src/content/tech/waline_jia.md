---
title: 'Astro 博客集成 Waline 评论系统'
description: '从零搭建 Waline 评论系统，支持邮件提醒'
publishDate: '2026-05-30'
updatedDate: '2026-05-30'
tags:
  - 博客
  - 技术分享
  - Astro
language: 'Chinese'
draft: false
slug: ''
heroImage: { src: './waline_jia.jpg', color: '#24292e' }
---

## 前言

在搭建博客的时候，一个评论系统可以帮助你和读者进行互动。Waline 是一个轻量、功能丰富的评论系统，支持 Markdown、邮件提醒、表情包等功能。

Waline 可以基于 LeanCloud 以及 Vercel 搭建，虽然需要后端，但项目本身做了很好的封装，用户不需要了解任何内容，只需要跟着流程走下来就好。其安装教程为 [官方文档](https://waline.js.org/guide/get-started/)，全部手把手进行即可。

也可以使用 Giscus 作为评论系统，见 [这个教程](https://vitepress.yiov.top/plugin)。

本教程主要是根据官网教程来，这里只是大概步骤，想要搭建的读者看这个教程，自行跳转（[官方文档](https://waline.js.org/guide/get-started/)），建议看 B 站视频有手把手更好。

## 第一步：注册 LeanCloud

Waline 需要一个数据库来存储评论数据，这里使用 LeanCloud（国际版）。

1. 访问 [LeanCloud](https://leancloud.app) 注册账号
2. 创建应用，记住以下三个值：
   - `APP_ID`
   - `APP_KEY`
   - `SERVER_URL`（类似 `https://xxx.lc-cn-n1-shared.com`）

## 第二步：部署 Waline 到 Vercel

1. 在 GitHub 上 Fork [Waline 仓库](https://github.com/walinejs/waline)
2. 登录 [Vercel](https://vercel.com)，点击 **Add New → Project**
3. 导入你 Fork 的 Waline 仓库
4. 点 **Deploy**，等待部署完成
5. 部署完成后，访问 `https://你的服务地址/ui/` 注册第一个账号（**第一个注册的自动成为管理员**，务必在部署后直接先行登录）

## 第三步：在 Astro 中集成

### 安装客户端库

```bash
npm install @waline/client
```

### 创建 Comment 组件

创建 `src/components/waline/Comment.astro`：

```astro
---
import '@waline/client/style'
const { class: className } = Astro.props
---

<comment-component>
  <div id='waline' class={`not-prose ${className}`}>
    Comment seems to stuck. Try to refresh?✨
  </div>
</comment-component>

<script>
  import { init as walineInit } from '@waline/client'

  const walineConfig = {
    server: 'https://你的waline服务地址.vercel.app',
    emoji: ['weibo', 'alus', 'bilibili', 'qq'],
    additionalConfigs: {
      locale: {
        placeholder: '欢迎留言~(支持Markdown语法)'
      }
    }
  }

  class Comment extends HTMLElement {
    constructor() {
      super()
    }

    connectedCallback() {
      const walineInstance = walineInit({
        el: '#waline',
        serverURL: walineConfig.server,
        reaction: [],
        dark: 'html.dark',
        pageview: true,
        comment: true,
        ...walineConfig.additionalConfigs
      })
      walineInstance?.update()
    }
  }

  customElements.define('comment-component', Comment)
</script>

<style>
  :global(.dark) #waline {
    --waline-bg-color: var(--card-bg);
    --waline-bg-color-light: var(--btn-plain-bg-hover);
  }
  :global(.wl-count) { color: var(--waline-dark-grey); }
  :global(.wl-editor) { padding: 0.35em 0.5em; width: calc(100% - 2em); }
  :global(.wl-edit) { color: var(--waline-dark-grey); }
  :global(#wl-edit)::placeholder { color: var(--waline-dark-grey); }
  :global(.wl-panel) { margin: .5em 0; border: none; }
</style>
```

### 配置 site.config.ts

在 `site.config.ts` 中启用 Waline 并填入你的服务地址：

```ts
waline: {
  enable: true,
  server: 'https://你的waline服务地址.vercel.app',
  showMeta: false,
  emoji: ['bilibili', 'weibo'],
  additionalConfigs: {
    pageview: true,
    comment: true,
    locale: {
      placeholder: '欢迎评论！(留下邮箱可以收到回复通知，无需登录)',
    }
  }
}
```

### 在布局中引入

在需要评论的布局组件中引入 Comment 组件：

```astro
import { Comment } from '@/components/waline'

// 在模板中使用
<Comment class='mt-3 sm:mt-6' />
```

## 第四步：配置邮件提醒

Waline 支持邮件提醒，当有人回复你的评论时会收到邮件通知。参考 [Waline 文档](https://waline.js.org/guide/features/notification.html) 搭建。

在 Waline 的 Vercel 项目中添加环境变量，以 QQ 邮箱为例：

```bash
SMTP_HOST=smtp.qq.com
SMTP_PORT=465
SMTP_USER=你的QQ邮箱@qq.com
SMTP_PASS=你的QQ邮箱授权码
SMTP_SECURE=TRUE
SITE_NAME=你的博客名
SITE_URL=https://你的博客地址
AUTHOR_EMAIL=你的QQ邮箱@qq.com
```

> **注意**：`SMTP_PASS` 不是 QQ 邮箱密码，需要在 QQ 邮箱 → 设置 → 账户 → 开启 SMTP 服务后生成的**授权码**。

添加环境变量后，重新部署 Waline 项目即可。

## 后记

以上就是完整的 Waline 集成过程，从 LeanCloud 注册到邮件提醒配置一共四步。评论系统上线后，读者不需要注册任何账号就可以留言，体验还是比较友好的。

如果在搭建过程中遇到问题，欢迎在评论区留言交流。
