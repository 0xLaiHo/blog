import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import rehypeShiki from '@shikijs/rehype'

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    { enforce: 'pre', ...mdx({ rehypePlugins: [[rehypeShiki, { theme: 'github-dark' }]] }) } as any,
    tanstackStart({ srcDirectory: 'src' }),
    viteReact(),
    nitro({ preset: 'cloudflare-pages' }),
  ],
})