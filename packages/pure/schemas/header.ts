import { z } from 'astro/zod'

const HeaderMenuItemSchema = () =>
  z.object({
    title: z.string(),
    link: z.string(),
    submenu: z.array(
      z.object({
        title: z.string(),
        link: z.string()
      })
    ).optional()
  })

export const HeaderMenuSchema = () =>
  z
    .array(HeaderMenuItemSchema())
    .default([
      { title: 'Blog', link: '/blog' },
      { title: 'Projects', link: '/projects' },
      { title: 'Links', link: '/links' },
      { title: 'About', link: '/about' }
    ])
    .describe('The header menu items for your site.')
