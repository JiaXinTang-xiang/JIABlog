---
title: '我的第一篇博客文章'
publishDate: 2025-03-30
description: '记录搭建个人博客的心得体会和踩坑经验'
tags:
  - 博客
  - 前端
  - Astro
  - 技术分享
# heroImage: { src: './thumbnail.jpg', color: '#4F46E5' }  # 暂时注释掉
language: '中文'
---

## 🚀 开始我的博客之旅

今天终于搭建好了属于自己的技术博客！这是一个基于 **Astro** 框架构建的现代化静态网站，让我来分享一下搭建过程中的心得体会。

### 为什么选择 Astro？

Astro 最吸引我的地方是它的 **岛屿架构（Islands Architecture）**：

- 🚀 **极快的加载速度** - 默认生成静态 HTML
- 📦 **组件级 hydration** - 只对必要的组件进行 hydration
- 🎯 **多框架支持** - 可以同时使用 React、Vue、Svelte 等
- 📝 **优秀的内容支持** - 内置 Markdown 和 MDX 支持

### 搭建过程回顾

1. **项目初始化**
   ```bash
   npm create astro@latest
   ```

2. **选择主题**
   选择了 astro-pure 主题，因为它：
   - 设计简洁美观
   - 功能完整（搜索、评论、RSS等）
   - 文档齐全

3. **个性化配置**
   - 修改站点信息
   - 更新个人介绍
   - 配置部署选项

### 踩过的坑

#### 1. GitHub Pages 部署问题
需要正确配置 `base` 路径：
```typescript
// astro.config.ts
export default defineConfig({
  base: '/repository-name/',
  site: 'https://username.github.io'
})
```

#### 2. 远程图片配置
构建时报错远程图片不允许，需要在配置中添加白名单：
```typescript
image: {
  domains: ['example.com'],
  remotePatterns: [
    { protocol: 'https', hostname: 'example.com' }
  ]
}
```

### 接下来的计划

- [ ] 写更多技术文章
- [ ] 完善项目展示页面
- [ ] 添加更多个性化功能
- [ ] 优化移动端体验

### 结语

搭建个人博客不仅是技术的实践，更是思考的整理。希望通过这个平台，能够更好地记录学习过程，分享技术心得。

> 好的工具让创作变得更有乐趣，而创作的过程本身就是最好的学习。

---

欢迎在评论区交流你的博客搭建经验！ 🎉