import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  // [Basic]
  /** Title for your website. Will be used in metadata and as browser tab title. */
  title: 'JiaXin‘s Blog',
  /** Will be used in index page & copyright declaration */
  author: '嘉心糖Jaxon',
  /** Description metadata for your website. Can be used in page metadata. */
  description: '分享一些技术思考和记录成长的点滴',
  /** The default favicon for your site which should be a path to an image in the `public/` directory. */
  favicon: '/favicon/favicon.ico',
  /** The default social card image for your site which should be a path to an image in the `public/` directory. */
  socialCard: '/images/social-card.png',
  /** Specify the default language for this site. */
  locale: {
    lang: 'zh-CN',
    attrs: 'zh_CN',
    // Date locale
    dateLocale: 'zh-CN',
    dateOptions: {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  },
  /** Set a logo image to show in the homepage. */
  logo: {
    src: '/src/assets/head.jpg',
    alt: 'Avatar'
  },
  //建议：保持现状
  titleDelimiter: '•',  //网站页面标题中各部分之间的分隔符  
  prerender: true, // pagefind search is not supported with prerendering disabled
  npmCDN: 'https://cdn.jsdelivr.net/npm',   //依赖第三方库时用的 CDN 源

  // Still in test  这是用来在 HTML 的 <head> 标签中添加自定义元数据或标签的
  head: [
    /* Telegram channel */
    // {
    //   tag: 'meta',
    //   attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
    //   content: ''
    // }
  ],
  customCss: [],

  /** Configure the header of your site. */
  header: {
    menu: [
      { title: 'Blog', link: '/blog' },
      { title: 'Docs', link: '/docs' },
      { title: 'Projects', link: '/projects' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' }
    ]
  },

  /** Configure the footer of your site. */
  footer: {
    // Year format  年份格式
    year: `© ${new Date().getFullYear()}`,
    // year: `© 2024 - ${new Date().getFullYear()}`,
    links: [
      // Registration link  真实的 ICP 备案信息
      {
        title: 'Moe ICP 114514',
        link: 'https://icp.gov.moe/?keyword=114514',
        style: 'text-sm' // Uno/TW CSS class
      },
      // Privacy Policy link  隐私政策和使用条款链接
      {
        title: 'Site Policy',
        link: '/terms',
        pos: 2 // position set to 2 will be appended to copyright line
      }
    ],
    /** Enable displaying a “Astro & Pure theme powered” link in your site’s footer. */
    credits: true,    //这是对主题作者的尊重
    /** Optional details about the social media accounts for this site. */
    social: {
      github: 'https://github.com/jiaxintang-xiang',
      email: 'mailto:2174064279@qq.com',
      // 可以添加更多社交链接
      // twitter: 'https://twitter.com/yourusername',
      // weibo: 'https://weibo.com/yourusername'
    }
  },
  
  // [Content]
  content: {
    /** External links configuration  外部链接配置*/ 
    externalLinks: {
      content: ' ↗',   //提示用户这是外部链接（会跳转到其他网站）
      /** Properties for the external links element */
      properties: {
        style: 'user-select:none'
      }
    },
    /** Blog page size for pagination (optional) */
    blogPageSize: 8,
    // Currently support weibo, x, bluesky 社交分享按钮
    share: ['weibo', 'x', 'bluesky']  
  }
}

export const integ: IntegrationUserConfig = {
  // [Links]
  // https://astro-pure.js.org/docs/integrations/links
  links: {
    // Friend logbook
    logbook: [
      { date: '2025-03-30', content: '开始完善个人博客，记录技术成长之路' },
      { date: '2025-03-29', content: '学习 Astro 框架，体验现代前端开发的魅力' },
      { date: '2025-03-28', content: '配置 GitHub Pages 自动部署，让分享变得更简单' },
      { date: '2025-03-27', content: '思考博客的定位：不仅是技术分享，更是生活记录' },
      { date: '2025-03-26', content: '每一个项目都是成长的见证，每一篇文章都是思考的结晶' }
    ],
    // Yourself link info
    applyTip: [
      { name: 'Name', val: theme.title },
      { name: 'Desc', val: theme.description || 'Null' },
      { name: 'Link', val: 'https://jiaxintang-xiang.github.io/JIABlog/' },
      { name: 'Avatar', val: '/favicon/favicon.ico' }
    ],
    // Cache avatars in `public/avatars/` to improve user experience.
    cacheAvatar: false
  },
  // [Search]
  pagefind: true,
  // Add a random quote to the footer (default on homepage footer)
  // See: https://astro-pure.js.org/docs/integrations/advanced#web-content-render
  // [Quote]
  quote: {
    // - Hitokoto
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    // server: 'https://v1.hitokoto.cn/?c=i',
    // target: `(data) => (data.hitokoto || 'Error')`
    // - Quoteable
    // https://github.com/lukePeavey/quotable
    // server: 'http://api.quotable.io/quotes/random?maxLength=60',
    // target: `(data) => data[0].content || 'Error'`
    // - DummyJSON
    server: 'https://dummyjson.com/quotes/random',
    target: `(data) => (data.quote.length > 80 ? \`\${data.quote.slice(0, 80)}...\` : data.quote || 'Error')`
  },
  // [Typography]
  // https://unocss.dev/presets/typography
  typography: {
    class: 'prose text-base',
    // The style of blockquote font `normal` / `italic` (default to italic in typography)
    blockquoteStyle: 'italic',
    // The style of inline code block `code` / `modern` (default to code in typography)
    inlineCodeBlockStyle: 'modern'
  },
  // [Lightbox]
  // A lightbox library that can add zoom effect
  // https://astro-pure.js.org/docs/integrations/others#medium-zoom
  mediumZoom: {
    enable: true, // disable it will not load the whole library
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },
  // Comment system
  waline: {
    enable: true,
    // Server service link222222222222
    server: 'https://astro-theme-pure-waline.arthals.ink/',
    // Show meta info for comments
    showMeta: false,
    // Refer https://waline.js.org/en/guide/features/emoji.html
    emoji: ['bmoji', 'weibo'],
    // Refer https://waline.js.org/en/reference/client/props.html
    additionalConfigs: {
      // search: false,
      pageview: true,
      comment: true,
      locale: {
        reaction0: 'Like',
        placeholder: 'Welcome to comment. (Email to receive replies. Login is unnecessary)'
      },
      imageUploader: false
    }
  }
}

export const terms: CardListData = {
  title: 'Terms content',
  list: [
    {
      title: 'Privacy Policy',
      link: '/terms/privacy-policy'
    },
    {
      title: 'Terms and Conditions',
      link: '/terms/terms-and-conditions'
    },
    {
      title: 'Copyright',
      link: '/terms/copyright'
    },
    {
      title: 'Disclaimer',
      link: '/terms/disclaimer'
    }
  ]
}

const config = { ...theme, integ } as Config
export default config
