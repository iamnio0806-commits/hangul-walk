import { motion } from 'framer-motion'
import { manifesto, paths, totalLessons } from '../data/curriculum'
import { Garden } from './Garden'

interface Props {
  blooms: number
  ratio: number
  name: string
  onStart: () => void
  onOpenPath: (pathId: string) => void
}

export function Home({ blooms, ratio, name, onStart, onOpenPath }: Props) {
  return (
    <>
      <section className="hero">
        <div className="hero-visual" aria-hidden>
          <motion.div
            className="hero-wash"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="hero-content">
          <motion.h1
            className="hero-brand"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            한글산책
          </motion.h1>
          <motion.p
            className="hero-brand-sub"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            韓文散步
          </motion.p>
          <motion.p
            className="hero-line"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
          >
            沒有考試的韓文學系。自學，慢慢來，開開心心。
          </motion.p>
          <motion.p
            className="hero-support"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            字母、日常一句話、文學小徑——想走哪條就走哪條。錯了重來，停下來也完全沒關係。
          </motion.p>
          <motion.div
            className="cta-row"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.65 }}
          >
            <button type="button" className="btn-primary" onClick={onStart}>
              {name ? `${name}，開始散步` : '開始散步'}
            </button>
            <a className="btn-ghost" href="#paths">
              看看三條小徑
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          往下 · 花園與小徑
        </motion.div>
      </section>

      <Garden blooms={blooms} total={totalLessons()} name={name} ratio={ratio} />

      <section className="section" id="paths">
        <div className="section-head">
          <p className="section-kicker">학과 · 系館地圖</p>
          <h2 className="section-title">三條快樂小徑</h2>
          <p className="section-blurb">像選修課，但沒有點名、沒有期末。點進去就能學。</p>
        </div>

        <div className="manifesto">
          <ul>
            {manifesto.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>

        <div className="path-list">
          {paths.map((path, i) => (
            <motion.button
              key={path.id}
              type="button"
              className="path-row"
              onClick={() => onOpenPath(path.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="path-row-main">
                <h3>
                  <span className="path-dot" style={{ background: path.color }} />
                  {path.name}
                  <em>{path.nameKo}</em>
                </h3>
                <p>{path.blurb}</p>
              </div>
              <span className="path-meta">{path.lessons.length} 堂課 →</span>
            </motion.button>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>
          <strong>한글산책</strong> · 為自學者蓋的快樂韓文學系
        </p>
        <p style={{ marginTop: '0.5rem' }}>進度存在你的瀏覽器裡。清空網站資料就會重新種花。</p>
      </footer>
    </>
  )
}
