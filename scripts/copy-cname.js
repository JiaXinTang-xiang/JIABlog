// 构建完成后复制 CNAME 文件到 dist 目录
import fs from 'fs'
import path from 'path'

const cnameSource = path.resolve('static/CNAME')
const cnameDest = path.resolve('dist/CNAME')

if (fs.existsSync(cnameSource)) {
  fs.copyFileSync(cnameSource, cnameDest)
  console.log('✅ CNAME 文件已复制到 dist 目录')
} else {
  console.log('⚠️ CNAME 文件不存在')
}