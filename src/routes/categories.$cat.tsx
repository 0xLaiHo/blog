import { createFileRoute, Link } from '@tanstack/react-router'
import { ARTICLES } from '~/data/articles'
import { BASE_URL } from '~/data/site'
import { ArticleGrid } from '~/components/ArticleGrid'

export const Route = createFileRoute('/categories/$cat')({
  head: ({ params }) => {
    const url = `${BASE_URL}/categories/${params.cat}`
    return {
      meta: [
        { title: `${params.cat} // NEON//UTOPIA` },
        { property: 'og:title', content: params.cat },
        { property: 'og:url', content: url },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: CategoryListComponent,
})

function CategoryListComponent() {
  const { cat } = Route.useParams()
  const list = ARTICLES.filter((a) => a.cat === cat)
  return (
    <div className="page">
      <section className="section">
        <div className="section-head">
          <div className="section-title reveal">
            <span className="idx">05 //</span> {cat} <span style={{ color: 'var(--text-faint)' }}>· {list.length} 篇</span>
          </div>
          <Link to="/categories" className="section-link reveal" data-delay="1">全部分类 →</Link>
        </div>
        {list.length ? (
          <ArticleGrid articles={list} />
        ) : (
          <p className="reveal" style={{ color: 'var(--text-dim)' }}>这个分类下还没有文章。</p>
        )}
      </section>
    </div>
  )
}