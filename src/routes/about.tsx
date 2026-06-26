import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  head: () => ({ meta: [{ title: '关于 // NEON//UTOPIA' }] }),
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="page">
      <section className="about" data-screen-label="About">
        <h1>mactavish</h1>
        <div className="role reveal">写作者 · 代码工人 · 夜间校准者 / Writer, coder, night-shift calibrator</div>
        <p className="reveal" data-delay="1">白天写代码，晚上写句子。住在霓虹与几何之间的缝里，相信乌托邦是个动词。</p>
        <p className="reveal" data-delay="2">这个博客是我向城市发出的广播信号——偶尔有人接收到，偶尔只有回声。我都不介意。</p>
        <p className="reveal" data-delay="3">我喜欢在凌晨三点调试一段 shader，喜欢在没人的地铁站读旧科幻，相信每一行被认真写下的代码都是给未来的一封信。</p>
        <div className="links reveal" data-delay="4">
          <Link to="/articles" className="btn btn-ghost">读我的文章 →</Link>
          <a className="btn btn-ghost" href="mailto:hi@neon-utopia.dev">写信给我</a>
          <a className="btn btn-ghost" href="#">GitHub</a>
        </div>
      </section>
    </div>
  )
}