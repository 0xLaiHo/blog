import { Outlet, createFileRoute } from '@tanstack/react-router'
import { BASE_URL } from '~/data/site'

export const Route = createFileRoute('/categories')({
  head: () => ({
    meta: [
      { title: '分类目录 // NEON//UTOPIA' },
      { property: 'og:title', content: '分类目录 // NEON//UTOPIA' },
      { property: 'og:url', content: `${BASE_URL}/categories` },
    ],
    links: [{ rel: 'canonical', href: `${BASE_URL}/categories` }],
  }),
  component: () => <Outlet />,
})