# 🚀 博客部署指南

本项目使用自动化脚本处理本地开发和生产部署的路径配置问题。

## 📋 快速开始

### 本地开发
```bash
# 一键配置开发环境并启动
npm run dev:setup

# 或者分步执行
npm run config:dev    # 配置开发环境路径
npm run dev          # 启动开发服务器
```

### 生产部署
```bash
# 一键配置生产环境并构建
npm run build:setup

# 或者分步执行
npm run config:prod   # 配置生产环境路径
npm run build        # 构建生产版本
```

## 🔧 手动配置说明

### 开发环境配置
开发环境下，所有路径都使用相对路径：
- 主页链接: `/`
- 搜索链接: `/search`
- astro.config.ts: `base` 配置被注释

### 生产环境配置
生产部署到 GitHub Pages，需要使用 `/JIABlog/` 前缀：
- 主页链接: `/JIABlog/`
- 搜索链接: `/JIABlog/search`
- astro.config.ts: `base: '/JIABlog/'` 配置生效

## 📁 文件备份机制

脚本会自动创建备份文件：
- `packages/pure/components/basic/Header.astro.backup`
- `astro.config.ts.backup`

如果需要手动恢复，可以复制备份文件覆盖原文件。

## 🛠️ 自定义配置

如果需要添加更多需要处理的文件，编辑 `scripts/path-config.js`：

```javascript
// 添加新的文件到处理列表
const filesToProcess = [
  'packages/pure/components/basic/Header.astro',
  'astro.config.ts',
  'src/other-file.astro'  // 添加新文件
]
```

## 🔍 故障排除

### 问题：页面链接仍然指向错误路径
**解决方案：**
1. 确保使用正确的配置命令
2. 检查是否有缓存，重启开发服务器
3. 手动删除 `.astro` 缓存目录

### 问题：构建失败
**解决方案：**
1. 运行 `npm run clean` 清理构建缓存
2. 重新运行配置脚本
3. 再次尝试构建

### 问题：备份文件丢失
**解决方案：**
如果备份文件意外删除，可以从 git 恢复：
```bash
git checkout packages/pure/components/basic/Header.astro
git checkout astro.config.ts
```

## 📝 注意事项

1. **不要手动修改** `Header.astro` 和 `astro.config.ts` 中的路径配置
2. 每次切换环境时都要运行相应的配置脚本
3. 提交代码前确保运行 `npm run config:dev` 恢复到开发环境配置
4. 部署到 GitHub Pages 前运行 `npm run config:prod`

## 🎯 自动化优势

- ✅ 避免手动修改路径导致的错误
- ✅ 一键切换开发和生产环境
- ✅ 自动备份原文件，安全可靠
- ✅ 支持扩展更多需要处理的文件