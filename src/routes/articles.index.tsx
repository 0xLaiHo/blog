import { createFileRoute } from '@tanstack/react-router'
import { ARTICLES } from '~/data/articles'
import { BASE_URL } from '~/data/site'
import { ArticleGrid } from '~/components/ArticleGrid'

export const Route = createFileRoute('/articles/')({
  head: () => ({
    meta: [
      { title: '文章 // NEON//UTOPIA' },
      { property: 'og:title', content: '文章 // NEON//UTOPIA' },
      { property: 'og:url', content: `${BASE_URL}/articles` },
    ],
    links: [{ rel: 'canonical', href: `${BASE_URL}/articles` }],
  }),
  component: ArticlesComponent,
})

function ArticlesComponent() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-head">
          <div className="section-title reveal"><span className="idx">02 //</span> 全部文章</div>
        </div>
        <ArticleGrid articles={ARTICLES} />
      </section>
    </div>
  )
}