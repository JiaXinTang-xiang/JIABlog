// astro.config.mjs

REPO_BASE = '/JIABlog/';
export default defineConfig({
  site: 'JiaXinTang-xiang.github.io',
  base: REPO_BASE,
  trailingSlash: 'always',
  output: 'static',
})