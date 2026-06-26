import { createFileRoute, Link } from '@tanstack/react-router'
import { getArticle } from '~/data/articles'
import { NotFound } from '~/components/NotFound'

export const Route = createFileRoute('/articles/$slug')({
  head: ({ params }) => {
    const m = getArticle(params.slug)
    return { meta: [{ title: `${m?.meta.title ?? '未找到'} // NEON//UTOPIA` }] }
  },
  component: ArticleComponent,
  notFoundComponent: () => <NotFound>信号丢失。这篇文章不在网格里。</NotFound>,
})

function ArticleComponent() {
  const { slug } = Route.useParams()
  const m = getArticle(slug)
  if (!m) return <NotFound>信号丢失。这篇文章不在网格里。</NotFound>
  const Body = m.default
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
            <Link key={t} to="/tags" className="tag">#{t}</Link>
          ))}
        </div>
      </article>
    </div>
  )
}