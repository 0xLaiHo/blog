import { createFileRoute, Link } from '@tanstack/react-router'
import { TAGS } from '~/data/articles'

export const Route = createFileRoute('/tags')({
  head: () => ({ meta: [{ title: '标签矩阵 // NEON//UTOPIA' }] }),
  component: TagsComponent,
})

function TagsComponent() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-head">
          <div className="section-title reveal"><span className="idx">04 //</span> 标签矩阵</div>
        </div>
        <div className="tag-cloud">
          {TAGS.map((t, i) => (
            <Link key={t.n} to="/articles" className="tag reveal" data-delay={(i % 5) + 1}>
              #{t.n}<span className="n">{t.c}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}