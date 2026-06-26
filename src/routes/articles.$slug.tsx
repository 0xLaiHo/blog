import { createFileRoute, Link } from '@tanstack/react-router'
import { ARTICLES, getArticle } from '~/data/articles'
import { NotFound } from '~/components/NotFound'
import { BASE_URL } from '~/data/site'

export const Route = createFileRoute('/articles/$slug')({
  head: ({ params }) => {
    const m = getArticle(params.slug)
    const title = m?.meta.title ?? '未找到'
    const desc = m?.meta.excerpt ?? 'NEON//UTOPIA 博客文章'
    const url = `${BASE_URL}/articles/${params.slug}`
    return {
      meta: [
        { title: `${title} // NEON//UTOPIA` },
        { name: 'description', content: desc },
        { property: 'og:title', content: title },
        { property: 'og:description', content: desc },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: desc },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
  component: ArticleComponent,
  notFoundComponent: () => <NotFound>信号丢失。这篇文章不在网格里。</NotFound>,
})

function ArticleComponent() {
  const { slug } = Route.useParams()
  const m = getArticle(slug)
  if (!m) return <NotFound>信号丢失。这篇文章不在网格里。</NotFound>
  const Body = m.default

  // ARTICLES is sorted newest -> oldest by date.
  const idx = ARTICLES.findIndex((a) => a.slug === slug)
  const older = idx >= 0 && idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : undefined
  const newer = idx > 0 ? ARTICLES[idx - 1] : undefined

  return (
    <div className="page">
      <article className="article" data-screen-label={`Article-${slug}`}>
        <Link to="/articles" className="article-back">← 返回列表</Link>
        <div className="article-cat">{m.meta.cat}</div>
        <h1>{m.meta.title}</h1>
        <div className="meta">
          <span><span className="dot" />{m.meta.date}</span>
          <span><span className="dot" />{m.meta.read} 分钟阅读</span>
          <span><span className="dot" />mactavish</span>
        </div>
        <div className="article-body">
          <Body />
        </div>
        <div className="tag-row">
          {m.meta.tags.map((t) => (
            <Link key={t} to="/tags/$tag" params={{ tag: t }} className="tag">#{t}</Link>
          ))}
        </div>
        <nav className="post-nav">
          {older && (
            <Link to="/articles/$slug" params={{ slug: older.slug }} className="post-nav-card prev">
              <span className="pn-label">← 上一篇</span>
              <span className="pn-title">{older.title}</span>
            </Link>
          )}
          {newer && (
            <Link to="/articles/$slug" params={{ slug: newer.slug }} className="post-nav-card next">
              <span className="pn-label">下一篇 →</span>
              <span className="pn-title">{newer.title}</span>
            </Link>
          )}
        </nav>
      </article>
    </div>
  )
}