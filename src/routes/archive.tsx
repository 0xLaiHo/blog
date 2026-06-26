import { createFileRoute, Link } from '@tanstack/react-router'
import { ARTICLES } from '~/data/articles'

export const Route = createFileRoute('/archive')({
  head: () => ({ meta: [{ title: '归档 // NEON//UTOPIA' }] }),
  component: ArchiveComponent,
})

function ArchiveComponent() {
  const years: Record<string, typeof ARTICLES> = {}
  for (const a of ARTICLES) {
    const y = a.date.slice(0, 4)
    ;(years[y] ||= []).push(a)
  }
  return (
    <div className="page">
      <section className="section">
        <div className="section-head">
          <div className="section-title reveal"><span className="idx">03 //</span> 时间线归档</div>
          <span className="section-link reveal" data-delay="1">按时间倒序 ↓</span>
        </div>
        {Object.entries(years).map(([y, items]) => (
          <div key={y}>
            <div className="archive-year reveal">{y}</div>
            {items.map((a) => (
              <Link
                key={a.slug}
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="archive-row reveal"
              >
                <div className="date">{a.date}</div>
                <div className="ttl">{a.title}</div>
                <div className="cat">{a.cat}</div>
              </Link>
            ))}
          </div>
        ))}
      </section>
    </div>
  )
}