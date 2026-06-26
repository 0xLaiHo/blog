# NEON//UTOPIA — 个人博客

赛博朋克 + 乌托邦风格的个人博客,跑在 **TanStack Start (SSR) + Bun** 上,部署到 **Cloudflare Pages (Worker 模式)**。

## 开发

```bash
bun install
bun run dev          # http://localhost:3000
```

## 写文章

在 `src/content/` 下新建 `*.mdx`:

```mdx
export const meta = {
  slug: 'my-new-post',
  title: '标题',
  cat: '思考',           // 思考 / 技术 / 随笔 / 代码 / 阅读
  date: '2026.07.01',
  read: 6,
  excerpt: '摘要一句话。',
  tags: ['标签1', '标签2'],
}

正文,支持 Markdown。代码块用 Shiki 自动高亮(github-dark)。
```

首页、文章列表、归档、标签、分类会自动收录。

## 生产 & 部署

```bash
bun run build        # 产物到 dist/
bun run preview      # 本地预览 build
bun run deploy       # 构建 + wrangler 部署到 Cloudflare Pages
```

首次部署前先 `bunx wrangler login`,并在 Cloudflare Dashboard 建一个名为 `neon-utopia` 的 Pages 项目。

## 路由

- `/` 首页 (Hero + 最新信号)
- `/articles` 文章列表
- `/articles/$slug` 文章详情
- `/archive` 时间线归档
- `/tags` 标签矩阵
- `/categories` 分类目录
- `/about` 关于
- `/rss.xml` RSS 订阅
- `/sitemap.xml` 站点地图

## 技术栈

- TanStack Start — SSR + 文件路由
- Bun — 包管理 & 构建
- @mdx-js/rollup — MDX 内容
- @shikijs/rehype — 代码高亮
- Cloudflare Pages — 托管 (Worker)# blog
