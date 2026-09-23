import { motion } from 'framer-motion'

interface Props {
  blooms: number
  total: number
  name: string
  ratio: number
}

export function Garden({ blooms, total, name, ratio }: Props) {
  const sprouts = Array.from({ length: Math.min(blooms, 9) }, (_, i) => i)

  return (
    <section className="section" id="garden">
      <div className="section-head">
        <p className="section-kicker">성장 · 成長</p>
        <h2 className="section-title">你的學習花園</h2>
        <p className="section-blurb">
          這裡沒有分數。每完成一堂散步課，就多一株小花。慢慢開就好。
        </p>
      </div>

      <div className="garden">
        <div className="garden-plot" aria-hidden>
          <div className="garden-sky" />
          <div className="garden-ground" />
          {sprouts.map((i) => {
            const left = 12 + ((i * 37) % 70)
            const h = 28 + (i % 4) * 10
            const delay = i * 0.08
            return (
              <motion.div
                key={i}
                className="sprout"
                style={{ left: `${left}%` }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="sprout-stem" style={{ height: h }} />
                <span
                  className="sprout-leaf"
                  style={{ bottom: h * 0.45, left: -14, transform: 'rotate(-35deg)' }}
                />
                <span
                  className="sprout-leaf"
                  style={{ bottom: h * 0.55, left: 6, transform: 'rotate(40deg) scaleX(-1)' }}
                />
                <span className="sprout-flower" style={{ bottom: h - 2 }} />
              </motion.div>
            )
          })}
          {blooms === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
                fontFamily: 'var(--font-zh)',
                color: 'var(--ink-soft)',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              花園還空著——去走一堂課吧
            </motion.p>
          )}
        </div>

        <div className="garden-stats">
          <h3>{name ? `${name}的散步` : '你的散步'}</h3>
          <p>
            已走完 <strong>{blooms}</strong> / {total} 堂課。
            {blooms === 0 && ' 從字母、日常或文學任一條小徑開始。'}
            {blooms > 0 && blooms < total && ' 開得很漂亮。想停就停，想走就走。'}
            {blooms >= total && ' 整座花園都開了——但韓文的路還很長，隨時可以再逛。'}
          </p>
          <div className="progress-bar" role="progressbar" aria-valuenow={Math.round(ratio * 100)}>
            <div className="progress-fill" style={{ width: `${ratio * 100}%` }} />
          </div>
          <p className="progress-label">進度是風景，不是成績單</p>
        </div>
      </div>
    </section>
  )
}
