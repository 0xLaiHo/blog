/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRoute,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { TopNav, Footer } from '~/components/TopNav'
import { useProgress, useCardGlow } from '~/hooks/effects'
import { BASE_URL, SITE_NAME, DEFAULT_OG } from '~/data/site'
import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'NEON//UTOPIA — 在霓虹里校准乌托邦' },
      {
        name: 'description',
        content:
          'mactavish 的个人博客。赛博朋克美学、乌托邦想象、代码与日常的回声。',
      },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: 'NEON//UTOPIA — 在霓虹里校准乌托邦' },
      { property: 'og:description', content: 'mactavish 的个人博客。赛博朋克美学、乌托邦想象、代码与日常的回声。' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: BASE_URL },
      { property: 'og:image', content: `${BASE_URL}${DEFAULT_OG}` },
      { name: 'twitter:card', content: 'summary' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: BASE_URL },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'NEON//UTOPIA',
        href: '/rss.xml',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary as any,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const loc = useLocation()
  useProgress()
  useCardGlow()

  // Each navigation: reset .reveal, scroll top, then re-scan after paint.
  React.useEffect(() => {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.remove('in'))
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    const t = setTimeout(() => {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    }, 80)
    return () => clearTimeout(t)
  }, [loc.pathname])

  return (
    <html lang="zh">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="bg-layer" />
        <div className="bg-grid" />
        <div className="bg-scan" />
        <div className="bg-noise" />
        <div className="progress" id="progress" />
        <TopNav />
        <div className="stage">
          <div key={loc.pathname} className="page-shell">{children}</div>
        </div>
        <Footer />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}