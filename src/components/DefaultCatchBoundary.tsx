import {
  ErrorComponent,
  Link,
  useLocation,
  useRouter,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useLocation({
    select: (location) => location.pathname === '/',
  })

  console.error('DefaultCatchBoundary Error:', error)

  return (
    <div className="err-boundary">
      <ErrorComponent error={error} />
      <div className="err-actions">
        <button onClick={() => router.invalidate()} className="err-btn">
          Try Again
        </button>
        {isRoot ? (
          <Link to="/" className="err-btn">Home</Link>
        ) : (
          <Link
            to="/"
            className="err-btn"
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  )
}