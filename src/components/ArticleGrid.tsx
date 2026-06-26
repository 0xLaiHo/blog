import { Link } from '@tanstack/react-router'
import type { ArticleMeta } from '~/data/articles'

export function ArticleGrid({ articles }: { articles: ArticleMeta[] }) {
  return (
    <div className="grid grid-3">
      {articles.map((a, i) => (
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
  )
}