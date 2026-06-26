import { createFileRoute } from '@tanstack/react-router'
import { ARTICLES } from '~/data/articles'

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: () => {
        const items = ARTICLES.map(
          (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>https://neon-utopia.pages.dev/articles/${a.slug}</link>
      <guid>https://neon-utopia.pages.dev/articles/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <category>${esc(a.cat)}</category>
      <description>${esc(a.excerpt)}</description>
    </item>`,
        ).join('\n')
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>NEON//UTOPIA</title>
    <link>https://neon-utopia.pages.dev</link>
    <description>mactavish 的个人博客 — 在霓虹里校准乌托邦</description>
    <language>zh-CN</language>
${items}
  </channel>
</rss>`
        return new Response(xml, {
          headers: { 'content-type': 'application/xml; charset=utf-8' },
        })
      },
    },
  },
})

function esc(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c] || c))
}