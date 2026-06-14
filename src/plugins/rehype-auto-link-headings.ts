import type { Element, ElementContent, Root } from 'hast'

const headingRank = (tag: string) => /^h[1-6]$/.test(tag)

function walk(nodes: any[], options: { properties: any; behavior: string; content: any }): any[] {
  return nodes.map((node) => {
    if (!node || node.type !== 'element' || !node.tagName) return node

    if (headingRank(node.tagName) && node.properties?.id) {
      const { properties, behavior, content } = options
      const link: Element = {
        type: 'element',
        tagName: 'a',
        properties: { ...properties, href: `#${node.properties.id}` },
        children: Array.isArray(content)
          ? content
          : typeof content === 'object' && content.type
            ? [content]
            : []
      }

      const children = node.children || []
      if (behavior === 'wrap') {
        return { ...node, children: [link] }
      } else if (behavior === 'prepend') {
        return { ...node, children: [link, ...children] }
      } else if (behavior === 'append') {
        return { ...node, children: [...children, link] }
      }
    }

    if (node.children) {
      return { ...node, children: walk(node.children, options) }
    }

    return node
  })
}

// Add # link to headings
export default function rehypeAutolinkHeadings({
  properties = { ariaHidden: 'true', tabIndex: -1 },
  behavior = 'prepend',
  content = { type: 'text', value: '#' } as ElementContent
} = {}) {
  return (tree: Root) => {
    if (!tree || !tree.children) return
    tree.children = walk(tree.children, { properties, behavior, content })
  }
}
