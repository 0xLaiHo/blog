import * as React from 'react'

export type ArticleMeta = {
  slug: string
  title: string
  cat: string
  date: string
  read: number
  excerpt: string
  tags: string[]
  cover?: string
  draft?: boolean
}

type MdxModule = {
  meta: ArticleMeta
  default: React.ComponentType
}

// Eager glob of all content/*.mdx — resolved at build time.
const modules = import.meta.glob('../content/*.mdx', { eager: true }) as Record<
  string,
  MdxModule
>

// Production hides drafts; dev keeps them so you can preview.
const isDev = import.meta.env.DEV

export const ARTICLES: ArticleMeta[] = Object.values(modules)
  .map((m) => m.meta)
  .filter((m) => isDev || !m.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export const TAGS = TAG_COUNTS(ARTICLES)
export const CATS = CAT_GROUPS(ARTICLES)

export function getArticle(slug: string): MdxModule | undefined {
  const path = `../content/${slug}.mdx`
  return modules[path]
}

function TAG_COUNTS(list: ArticleMeta[]) {
  const counts: Record<string, number> = {}
  for (const a of list)
    for (const t of a.tags) counts[t] = (counts[t] || 0) + 1
  return Object.entries(counts).map(([n, c]) => ({ n, c }))
}

function CAT_GROUPS(list: ArticleMeta[]) {
  const groups: Record<string, { count: number; desc: string }> = {
    思考: { count: 0, desc: '关于美学、城市与时间的喃喃自语' },
    技术: { count: 0, desc: '图形、架构与一切让复杂变简单的事' },
    随笔: { count: 0, desc: '日常的校准与回声' },
    代码: { count: 0, desc: '写下的每一行都是给未来的一封信' },
    阅读: { count: 0, desc: '从别人的文字里借一点光' },
  }
  for (const a of list)
    if (groups[a.cat]) groups[a.cat].count++
  return Object.entries(groups).map(([name, v]) => ({ name, ...v }))
}