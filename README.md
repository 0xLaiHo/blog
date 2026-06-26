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
  cover: '/images/my-new-post/cover.jpg',  // 可选,社交分享时用作 og:image
  draft: true,                              // 可选,生产隐藏、dev 可见
}

正文,支持 Markdown。代码块用 Shiki 自动高亮(github-dark)。
```

首页、文章列表、归档、标签、分类会自动收录(草稿在生产环境隐藏)。

## 贴图

约定:把图片放进 `public/images/<slug>/`,MDX 里这样引用:

```mdx
<img src="/images/my-new-post/1.jpg" alt="描述" />

<figure>
  <img src="/images/my-new-post/diagram.png" alt="结构图" />
  <figcaption>图 1:示意</figcaption>
</figure>
```

`public/` 下的资源不被 Vite 处理,直接按路径访问。

## 生产 & 部署

```bash
bun run build        # 产物到 dist/
bun run preview      # 本地预览 build
bun run deploy       # 构建 + wrangler 部署到 Cloudflare Pages
```

**Via Cloudflare Pages Git 集成**:`wrangler.toml` 的 `[build]` 段已声明构建命令,推送到 GitHub 后 Cloudflare 会自动 `bun install && bun run build`。记得在项目的 Settings → Environment variables 加一次 `BUN_VERSION=1.3.14`。

首次部署前先 `bunx wrangler login`。

## 路由

- `/` 首页 (Hero + 最新信号)
- `/articles` 文章列表
- `/articles/$slug` 文章详情(含 上一篇/下一篇 导航 + og/canonical)
- `/archive` 时间线归档
- `/tags` 标签矩阵
- `/tags/$tag` 单标签过滤
- `/categories` 分类目录
- `/categories/$cat` 单分类过滤
- `/about` 关于
- `/rss.xml` RSS 订阅
- `/sitemap.xml` 站点地图

## 技术栈

- TanStack Start — SSR + 文件路由
- Bun — 包管理 & 构建
- @mdx-js/rollup — MDX 内容
- @shikijs/rehype — 代码高亮
- Cloudflare Pages — 托管 (Worker)# blog
