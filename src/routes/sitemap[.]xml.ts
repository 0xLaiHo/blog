import { createFileRoute } from '@tanstack/react-router'
import { ARTICLES } from '~/data/articles'

const STATIC = ['/', '/articles', '/archive', '/tags', '/categories', '/about']

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...STATIC.map((u) => `  <url><loc>https://neon-utopia.pages.dev${u}</loc></url>`),
          ...ARTICLES.map(
            (a) =>
              `  <url><loc>https://neon-utopia.pages.dev/articles/${a.slug}</loc><lastmod>${a.date}</lastmod></url>`,
          ),
        ].join('\n')
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
        return new Response(xml, {
          headers: { 'content-type': 'application/xml; charset=utf-8' },
        })
      },
    },
  },
})