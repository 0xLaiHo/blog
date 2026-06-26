import { createFileRoute, Link } from '@tanstack/react-router'
import { ARTICLES } from '~/data/articles'
import { BASE_URL } from '~/data/site'
import { ArticleGrid } from '~/components/ArticleGrid'

export const Route = createFileRoute('/tags/$tag')({
  head: ({ params }) => {
    const url = `${BASE_URL}/tags/${params.tag}`
    return {
      meta: [
        { title: `#${params.tag} // NEON//UTOPIA` },
        { property: 'og:title', content: `#${params.tag}` },
        { property: 'og:url', content: url },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: TagListComponent,
})

function TagListComponent() {
  const { tag } = Route.useParams()
  const list = ARTICLES.filter((a) => a.tags.includes(tag))
  return (
    <div className="page">
      <section className="section">
        <div className="section-head">
          <div className="section-title reveal">
            <span className="idx">04 //</span> #{tag} <span style={{ color: 'var(--text-faint)' }}>· {list.length} 篇</span>
          </div>
          <Link to="/tags" className="section-link reveal" data-delay="1">全部标签 →</Link>
        </div>
        {list.length ? (
          <ArticleGrid articles={list} />
        ) : (
          <p className="reveal" style={{ color: 'var(--text-dim)' }}>这个标签下还没有文章。</p>
        )}
      </section>
    </div>
  )
}