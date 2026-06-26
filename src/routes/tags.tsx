import { Outlet, createFileRoute } from '@tanstack/react-router'
import { BASE_URL } from '~/data/site'

export const Route = createFileRoute('/tags')({
  head: () => ({
    meta: [
      { title: '标签矩阵 // NEON//UTOPIA' },
      { property: 'og:title', content: '标签矩阵 // NEON//UTOPIA' },
      { property: 'og:url', content: `${BASE_URL}/tags` },
    ],
    links: [{ rel: 'canonical', href: `${BASE_URL}/tags` }],
  }),
  component: () => <Outlet />,
})