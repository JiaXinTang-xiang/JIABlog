#!/usr/bin/env node

/**
 * 自动配置路径脚本
 * 用于本地开发和生产部署时自动处理 /JIABlog/ 路径
 *
 * 使用方法:
 * - 本地开发: node scripts/path-config.js dev
 * - 生产部署: node scripts/path-config.js prod
 */

import fs from 'fs'
import path from 'path'

const MODE = process.argv[2]
const isProd = MODE === 'prod'
const isDev = MODE === 'dev'

if (!isProd && !isDev) {
  console.error('请指定模式: dev 或 prod')
  console.error('用法: node scripts/path-config.js dev|prod')
  process.exit(1)
}

console.log(`正在配置 ${isProd ? '生产' : '开发'} 环境路径...`)

// 需要处理的文件列表
const filesToProcess = [
  'packages/pure/components/basic/Header.astro',
  'astro.config.ts',
  'src/site.config.ts',
  'src/pages/tech/[...page].astro',
  'src/pages/terms/index.astro',
  'src/pages/404.astro',
  'src/pages/blog/[...page].astro',
  'src/pages/blog/index.astro',
  'src/pages/daily/[...page].astro',
  'src/pages/docs/index.astro',
  'src/pages/index.astro',
  'src/layouts/BlogPost.astro',
  'src/layouts/IndividualPage.astro',
  'src/layouts/ContentLayout.astro',
  'src/layouts/ContentPost.astro'
]

// 备份文件后缀
const BACKUP_SUFFIX = '.backup'

// 路径映射配置
const pathMappings = {
  dev: {
    find: '/JIABlog/',
    replace: '/'
  },
  prod: {
    find: '/',
    replace: '/JIABlog/'
  }
}

// 特殊处理 astro.config.ts
const astroConfigMappings = {
  dev: {
    find: "base: '/JIABlog/'",
    replace: "// base: '/JIABlog/'"
  },
  prod: {
    find: "// base: '/JIABlog/'",
    replace: "base: '/JIABlog/'"
  }
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

  // 特殊处理 astro.config.ts
  if (filePath === 'astro.config.ts') {
    const mapping = astroConfigMappings[MODE]
    if (content.includes(mapping.find)) {
      content = content.replace(new RegExp(escapeRegExp(mapping.find), 'g'), mapping.replace)
      modified = true
      console.log(`更新 astro.config.ts: ${mapping.find} → ${mapping.replace}`)
    }
  } else if (filePath === 'src/site.config.ts') {
    // 特殊处理 site.config.ts 中的静态资源路径
    const mapping = pathMappings[MODE]
    if (content.includes(mapping.find)) {
      // 只替换配置值中的路径，避免破坏代码结构
      content = content.replace(/favicon: '\/favicon\//g, `favicon: '${mapping.replace}favicon/`)
      content = content.replace(/socialCard: '\/images\//g, `socialCard: '${mapping.replace}images/`)
      content = content.replace(/val: '\/favicon\//g, `val: '${mapping.replace}favicon/`)
      modified = true
      console.log(`更新 src/site.config.ts: 替换静态资源路径和导航菜单`)
    }
  } else {
    // 处理其他文件中的路径（使用更精确的匹配）
    const mapping = pathMappings[MODE]
    if (content.includes(mapping.find)) {
      // 使用更安全的替换方法，避免破坏代码结构
      let newContent = content

      // 只替换明确的链接模式
      newContent = newContent.replace(/href='\/JIABlog\/'/g, `href='${mapping.replace}`)
      newContent = newContent.replace(/href="\/JIABlog\/"/g, `href="${mapping.replace}`)
      newContent = newContent.replace(/link:\s*['"]\/JIABlog\//g, `link: '${mapping.replace}`)
      newContent = newContent.replace(/back='\/JIABlog\/'/g, `back='${mapping.replace}`)
      newContent = newContent.replace(/back="\/JIABlog\/"/g, `back="${mapping.replace}`)

      if (newContent !== content) {
        content = newContent
        modified = true
        console.log(`更新 ${filePath}: 替换路径 ${mapping.find} → ${mapping.replace}`)
      }
    }
  }

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8')
    console.log(`✅ 已更新: ${filePath}`)
  } else {
    console.log(`ℹ️ 无需更新: ${filePath}`)
  }
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 从备份恢复文件
function restoreFromBackup(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath)
  const backupPath = fullPath + BACKUP_SUFFIX

  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, fullPath)
    console.log(`已恢复: ${filePath}`)
  }
}

// 主执行逻辑
try {
  if (isDev) {
    // 开发模式：先恢复备份，然后应用开发配置
    console.log('\n🔄 恢复文件备份...')
    filesToProcess.forEach(restoreFromBackup)

    console.log('\n⚙️ 应用开发环境配置...')
    filesToProcess.forEach(processFile)

    console.log('\n✅ 开发环境配置完成！')
    console.log('现在可以运行: npm run dev')
  } else if (isProd) {
    // 生产模式：直接应用生产配置
    console.log('\n⚙️ 应用生产环境配置...')
    filesToProcess.forEach(processFile)

    console.log('\n✅ 生产环境配置完成！')
    console.log('现在可以运行: npm run build')
  }
} catch (error) {
  console.error('❌ 配置失败:', error.message)
  process.exit(1)
}