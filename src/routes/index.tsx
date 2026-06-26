import { createFileRoute, Link } from '@tanstack/react-router'
import { ARTICLES } from '~/data/articles'
import { BASE_URL } from '~/data/site'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'NEON//UTOPIA — 在霓虹里校准乌托邦' },
      { property: 'og:title', content: 'NEON//UTOPIA' },
      { property: 'og:url', content: BASE_URL },
    ],
    links: [{ rel: 'canonical', href: BASE_URL }],
  }),
  component: HomeComponent,
})

function HomeComponent() {
  const feature = ARTICLES[0]
  const rest = ARTICLES.slice(1, 5)
  return (
    <div className="page">
      <header className="hero-a" data-screen-label="Home">
        <div className="hero-eyebrow">
          <span>SYS // BLOG.26</span>
          <span>·</span>
          <span>在线 · 接收信号</span>
        </div>
        <h1 className="hero-title">
          <span className="l1">在霓虹与几何之间，</span>
          <span className="l2">写一点未来的事。</span>
        </h1>
        <p className="hero-sub">
          <b>NEON//UTOPIA</b> 是 mactavish 的个人博客。这里记录关于赛博朋克美学、乌托邦想象、代码与日常的回声。<br />
          Welcome to a quiet corner at the edge of the grid. <b>Signal's good tonight.</b>
        </p>
        <div className="hero-cta">
          <Link to="/articles" className="btn btn-primary">进入文章 <span>→</span></Link>
          <Link to="/about" className="btn btn-ghost">关于我</Link>
        </div>
        <div className="hero-meta">
          <div>LAT 31.23° / LON 121.47°</div>
          <div className="blink">● TRANSMITTING</div>
        </div>
      </header>

      <section className="section">
        <div className="section-head">
          <div className="section-title reveal"><span className="idx">01 //</span> 最新信号</div>
          <Link to="/articles" className="section-link reveal" data-delay="1">查看全部 →</Link>
        </div>
        <div className="grid grid-3">
          <Link
            to="/articles/$slug"
            params={{ slug: feature.slug }}
            className="card card-feature reveal"
            data-delay="1"
          >
            <div className="inner">
              <div className="f-left">
                <div className="card-cat">{feature.cat} · 置顶</div>
                <div className="card-title" style={{ fontSize: 26 }}>{feature.title}</div>
                <div className="card-excerpt">{feature.excerpt}</div>
                <div className="card-foot" style={{ marginTop: 18 }}>
                  <span>{feature.date}</span>
                  <span className="read">{feature.read} min →</span>
                </div>
              </div>
              <div className="f-right"><div className="glyph">N//U</div></div>
            </div>
          </Link>
          {rest.map((a, i) => (
            <Link
              key={a.slug}
              to="/articles/$slug"
              params={{ slug: a.slug }}
              className="card reveal"
              data-delay={i + 1}
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