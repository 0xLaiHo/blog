import { createFileRoute, Link } from '@tanstack/react-router'
import { CATS } from '~/data/articles'

export const Route = createFileRoute('/categories/')({
  component: CategoriesIndexComponent,
})

function CategoriesIndexComponent() {
  return (
    <div className="page">
      <section className="section">
        <div className="section-head">
          <div className="section-title reveal"><span className="idx">05 //</span> 分类目录</div>
        </div>
        <div className="cat-grid">
          {CATS.map((c, i) => (
            <Link key={c.name} to="/categories/$cat" params={{ cat: c.name }} className="cat-card reveal" data-delay={(i % 5) + 1}>
              <div className="c-name">{c.name}</div>
              <div className="c-count">{String(c.count).padStart(2, '0')} 篇</div>
              <div className="c-desc">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}