import { Link } from '@tanstack/react-router'
import type { RegisteredRouter } from '@tanstack/react-router'

const NAV: { to: string; label: string; exact?: boolean }[] = [
  { to: '/', label: '首页', exact: true },
  { to: '/articles', label: '文章' },
  { to: '/archive', label: '归档' },
  { to: '/tags', label: '标签' },
  { to: '/categories', label: '分类' },
  { to: '/about', label: '关于' },
]

export function TopNav() {
  return (
    <nav className="topnav">
      <Link to="/" className="brand">
        <span className="b1">NEON</span>
        <span className="slash">//</span>
        <span className="b2">UTOPIA</span>
      </Link>
      <div className="nav-links">
        {NAV.map((it) => (
          <Link
            key={it.to}
            to={it.to as any}
            activeProps={{ className: 'active' }}
            activeOptions={{ exact: it.exact ?? false }}
          >
            <span className="dot" />
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div>&copy; 2026 mactavish &middot; NEON//UTOPIA &middot; 在霓虹里校准乌托邦</div>
      <div className="ascii">[ signal &middot; good &middot; tonight ]</div>
    </footer>
  )
}