import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Home } from './components/Home'
import { PathView } from './components/PathView'
import { LessonView } from './components/LessonView'
import { useProgress } from './hooks/useProgress'
import { paths } from './data/curriculum'

type Screen =
  | { kind: 'home' }
  | { kind: 'path'; pathId: string }
  | { kind: 'lesson'; pathId: string; lessonId: string }

export default function App() {
  const { state, isDone, complete, setName, ratio } = useProgress()
  const [screen, setScreen] = useState<Screen>({ kind: 'home' })
  const [showName, setShowName] = useState(false)
  const [draftName, setDraftName] = useState('')

  const goHome = () => setScreen({ kind: 'home' })

  const startWalk = () => {
    if (!state.name) {
      setShowName(true)
      return
    }
    document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth' })
  }

  const confirmName = () => {
    const n = draftName.trim() || '漫步者'
    setName(n)
    setShowName(false)
    setTimeout(() => {
      document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="app">
      <div className="atmosphere" aria-hidden />
      <div className="shell">
        <nav className="topnav">
          <button type="button" className="brand-mark" onClick={goHome}>
            한글산책
            <span>韓文散步</span>
          </button>
          <div className="nav-actions">
            {screen.kind !== 'home' && (
              <button type="button" className="nav-link" onClick={goHome}>
                回首頁
              </button>
            )}
            <span className="bloom-pill" title="花園花朵數">
              {state.blooms} 朵
            </span>
          </div>
        </nav>

        <AnimatePresence mode="wait">
          {screen.kind === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Home
                blooms={state.blooms}
                ratio={ratio}
                name={state.name}
                onStart={startWalk}
                onOpenPath={(pathId) => setScreen({ kind: 'path', pathId })}
              />
            </motion.div>
          )}

          {screen.kind === 'path' && (
            <motion.div
              key={`path-${screen.pathId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <PathView
                pathId={screen.pathId}
                isDone={isDone}
                onBack={goHome}
                onOpenLesson={(lessonId) =>
                  setScreen({ kind: 'lesson', pathId: screen.pathId, lessonId })
                }
              />
            </motion.div>
          )}

          {screen.kind === 'lesson' && (
            <motion.div
              key={`lesson-${screen.lessonId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <LessonView
                pathId={screen.pathId}
                lessonId={screen.lessonId}
                alreadyDone={isDone(screen.lessonId)}
                onBack={() => setScreen({ kind: 'path', pathId: screen.pathId })}
                onComplete={complete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              background: 'rgba(26, 36, 32, 0.35)',
              display: 'grid',
              placeItems: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setShowName(false)}
          >
            <motion.div
              className="name-gate"
              style={{
                background: 'var(--paper)',
                borderRadius: 4,
                boxShadow: 'var(--shadow)',
                margin: 0,
                padding: '2.5rem 1.75rem',
              }}
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>怎麼稱呼你？</h2>
              <p>寫在花園牌子上就好。不想留名也可以直接散步。</p>
              <input
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="例如：민지、阿明"
                maxLength={12}
                onKeyDown={(e) => e.key === 'Enter' && confirmName()}
                autoFocus
              />
              <div className="cta-row" style={{ justifyContent: 'center' }}>
                <button type="button" className="btn-primary" onClick={confirmName}>
                  走進系館
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setName('漫步者')
                    setShowName(false)
                    setTimeout(() => {
                      document.getElementById('paths')?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }}
                >
                  匿名散步
                </button>
              </div>
              <p style={{ marginTop: '1.25rem', fontSize: '0.8rem' }}>
                目前有 {paths.length} 條小徑、共可種 {paths.reduce((n, p) => n + p.lessons.length, 0)}{' '}
                朵花
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
