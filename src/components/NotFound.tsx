import { Link } from '@tanstack/react-router'

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="notfound">
      <div className="nf-msg">
        {children || <p>404 // 信号丢失。你要找的页面不在网格里。</p>}
      </div>
      <p className="nf-actions">
        <button onClick={() => window.history.back()} className="err-btn">
          Go back
        </button>
        <Link to="/" className="err-btn primary">Start Over</Link>
      </p>
    </div>
  )
}