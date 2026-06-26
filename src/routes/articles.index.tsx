import { createFileRoute, Link } from '@tanstack/react-router'
import { ARTICLES } from '~/data/articles'

export const Route = createFileRoute('/articles/')({
  head: () => ({ meta: [{ title: '文章 // NEON//UTOPIA' }] }),
  component: ArticlesComponent,
})

function ArticlesComponent() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-head">
          <div className="section-title reveal"><span className="idx">02 //</span> 全部文章</div>
        </div>
        <div className="grid grid-3">
          {ARTICLES.map((a, i) => (
            <Link
              key={a.slug}
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className="card reveal"
              data-delay={(i % 5) + 1}
            >
              <div className="card-cat">{a.cat}</div>
              <div className="card-title">{a.title}</div>
              <div className="card-excerpt">{a.excerpt}</div>
              <div className="card-foot"><span>{a.date}</span><span className="read">{a.read} min →</span></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}