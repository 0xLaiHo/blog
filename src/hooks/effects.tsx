import * as React from 'react'

// reveal-on-scroll: scans .reveal elements once on mount.

export function useReveal() {
  React.useEffect(() => {
    let raf = 0
    const scan = () => {
      raf = 0
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    }
    raf = requestAnimationFrame(scan)
    return () => {
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])
}

// When route changes: reset all .reveal (remove .in), scroll to top, then re-scan.
export function useRevealOnRoute() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => el.classList.remove('in'))
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    return
  }, [])
}

export function useProgress() {
  React.useEffect(() => {
    const p = document.getElementById('progress')
    if (!p) return
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      p.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%'
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])
}

export function useCardGlow() {
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const c = (e.target as HTMLElement).closest('.card') as HTMLElement | null
      if (!c) return
      const r = c.getBoundingClientRect()
      c.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%')
    }
    document.addEventListener('mousemove', handler)
    return () => document.removeEventListener('mousemove', handler)
  }, [])
}