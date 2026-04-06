#!/usr/bin/env node

/**
 * 自定义域名配置脚本
 * 用于配置部署到自定义域名 jiaxin404.top
 *
 * 使用方法:
 * node scripts/custom-domain-config.js
 */

import fs from 'fs'
import path from 'path'

console.log('正在配置自定义域名 jiaxin404.top 环境...')

// 需要处理的文件列表
const filesToProcess = [
  'astro.config.ts',
  'src/site.config.ts',
  'src/components/BaseHead.astro',
  'src/pages/rss.xml.ts',
  'src/pages/blog/index.astro',
  'packages/pure/components/pages/PostPreview.astro',
  'src/pages/about/index.astro',
  'src/pages/projects/index.astro',
  'src/pages/tags/[tag]/[...page].astro',
  'src/pages/search/index.astro',
  'src/pages/archives/index.astro',
  'packages/pure/components/basic/Footer.astro',
  'src/pages/docs/index.astro',
  'packages/pure/components/pages/Hero.astro',
  'src/pages/blog/[...page].astro',
  'src/pages/tags/index.astro',
  'src/pages/tech/[...page].astro',
  'src/pages/daily/[...page].astro',
  'packages/pure/components/basic/Header.astro',
  'src/pages/terms/index.astro',
  'src/pages/index.astro',
  'src/pages/404.astro',
  'src/layouts/BlogPost.astro',
  'src/layouts/ContentLayout.astro',
  'src/layouts/ContentPost.astro',
  'src/layouts/IndividualPage.astro'
]

// 备份文件后缀
const BACKUP_SUFFIX = '.custom.backup'

// 自定义域名配置
const customDomainConfig = {
  site: 'http://jiaxin404.top/',
  base: '/'
}

function processFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath)

  if (!fs.existsSync(fullPath)) {
    console.warn(`文件不存在: ${filePath}`)
    return
  }

  // 创建备份（如果还没有备份）
  const backupPath = fullPath + BACKUP_SUFFIX
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(fullPath, backupPath)
    console.log(`创建备份: ${filePath}${BACKUP_SUFFIX}`)
  }

  let content = fs.readFileSync(fullPath, 'utf8')
  let modified = false

  // 处理 astro.config.ts
  if (filePath === 'astro.config.ts') {
    // 更新 site 配置
    if (content.includes("site: 'https://jiaxintang-xiang.github.io/JIABlog/'")) {
      content = content.replace(
        "site: 'https://jiaxintang-xiang.github.io/JIABlog/'",
        `site: '${customDomainConfig.site}'`
      )
      modified = true
      console.log(`更新 astro.config.ts: site → ${customDomainConfig.site}`)
    }

    // 更新 base 配置
    if (content.includes("base: '/JIABlog'")) {
      content = content.replace(
        "base: '/JIABlog'",
        `base: '${customDomainConfig.base}'`
      )
      modified = true
      console.log(`更新 astro.config.ts: base → ${customDomainConfig.base}`)
    }
  }

  // 处理 src/site.config.ts
  if (filePath === 'src/site.config.ts') {
    // 更新所有 /JIABlog/ 路径为 /
    const oldContent = content
    content = content.replace(/\/JIABlog\//g, '/')
    content = content.replace(/\/JIABlog/g, '')

    // 更新链接地址
    content = content.replace(
      "val: 'https://jiaxintang-xiang.github.io/JIABlog/'",
      `val: '${customDomainConfig.site}'`
    )

    if (content !== oldContent) {
      modified = true
      console.log('更新 src/site.config.ts: 替换所有路径为根路径')
    }
  } else {
    // 处理其他文件中的 /JIABlog/ 路径
    const oldContent = content
    content = content.replace(/\/JIABlog\//g, '/')
    content = content.replace(/href="\/JIABlog"/g, 'href="/"')
    content = content.replace(/href='\/JIABlog'/g, "href='/'" )
    content = content.replace(/link:\s*['"]\/JIABlog\//g, "link: '")
    content = content.replace(/back=['"]\/JIABlog\//g, "back='/")

    if (content !== oldContent) {
      modified = true
      console.log(`更新 ${filePath}: 替换 /JIABlog/ 路径为根路径`)
    }
  }

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8')
    console.log(`✅ 已更新: ${filePath}`)
  } else {
    console.log(`ℹ️ 无需更新: ${filePath}`)
  }
}

// 从备份恢复文件
function restoreFromBackup(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath)
  const backupPath = fullPath + BACKUP_SUFFIX

  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, fullPath)
    console.log(`已恢复: ${filePath}`)
  } else {
    console.log(`备份文件不存在: ${filePath}${BACKUP_SUFFIX}`)
  }
}

// 主执行逻辑
try {
  console.log('\n⚙️ 应用自定义域名配置...')
  filesToProcess.forEach(processFile)

  console.log('\n✅ 自定义域名配置完成！')
  console.log('现在可以运行: npm run build')
  console.log('然后可以将 dist 目录部署到你的服务器')
} catch (error) {
  console.error('❌ 配置失败:', error.message)
  process.exit(1)
}