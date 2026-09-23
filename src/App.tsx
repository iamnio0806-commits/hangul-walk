import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TodayPanel, StagePanel } from './components/LearnHub'
import { LessonView } from './components/LessonView'
import { Garden } from './components/Garden'
import { VocabBrowse } from './components/VocabBrowse'
import { useProgress } from './hooks/useProgress'
import { getLesson, totalLessons, type Stage } from './data/curriculum'
import { vocabulary } from './data/vocabulary'

type Tab = 'today' | Stage | 'garden'
type Screen =
  | { kind: 'hub'; tab: Tab }
  | { kind: 'lesson'; lessonId: string; from: Tab }

const tabs: { id: Tab; label: string }[] = [
  { id: 'today', label: '今日' },
  { id: 'sounds', label: '九音' },
  { id: 'spelling', label: '拼字' },
  { id: 'vocab', label: '單字' },
  { id: 'garden', label: '花園' },
]

export default function App() {
  const { state, isDone, complete, markDay, setName, ratio } = useProgress()
  const [screen, setScreen] = useState<Screen>({ kind: 'hub', tab: 'today' })
  const [showName, setShowName] = useState(false)
  const [draftName, setDraftName] = useState('')
  const [vocabMode, setVocabMode] = useState<'browse' | 'packs'>('browse')
  const [welcomed, setWelcomed] = useState(() => {
    try {
      return localStorage.getItem('hangul-walk-welcomed') === '1'
    } catch {
      return false
    }
  })

  const tab = screen.kind === 'hub' ? screen.tab : screen.from

  const openLesson = (lessonId: string) => {
    setScreen({ kind: 'lesson', lessonId, from: tab === 'garden' ? 'today' : tab })
  }

  const goTab = (t: Tab) => {
    if (t === 'vocab') setVocabMode('browse')
    setScreen({ kind: 'hub', tab: t })
  }

  const enter = () => {
    if (!state.name) {
      setShowName(true)
      return
    }
    try {
      localStorage.setItem('hangul-walk-welcomed', '1')
    } catch {
      /* ignore */
    }
    setWelcomed(true)
  }

  const confirmName = (anon = false) => {
    setName(anon ? '漫步者' : draftName.trim() || '漫步者')
    setShowName(false)
    try {
      localStorage.setItem('hangul-walk-welcomed', '1')
    } catch {
      /* ignore */
    }
    setWelcomed(true)
  }

  if (!welcomed) {
    return (
      <div className="app">
        <div className="atmosphere" aria-hidden />
        <div className="shell">
          <nav className="topnav">
            <div className="brand-mark">
              한글산책
              <span>韓文散步</span>
            </div>
          </nav>
          <section className="hero">
            <div className="hero-visual" aria-hidden>
              <div className="hero-wash" />
            </div>
            <div className="hero-content">
              <motion.h1
                className="hero-brand"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
              >
                한글산책
              </motion.h1>
              <p className="hero-brand-sub">韓文散步</p>
              <p className="hero-line">先九音，再拼字，再單字＋句子。沒有考試。</p>
              <p className="hero-support">
                跟你的德文自學同一套節奏：聲音 → 拼字 → {vocabulary.length}{' '}
                個單字（每個都有例句）。做完自己按「我會了」。
              </p>
              <div className="cta-row">
                <button type="button" className="btn-primary" onClick={enter}>
                  從九音開始
                </button>
              </div>
            </div>
          </section>
        </div>

        <AnimatePresence>
          {showName && (
            <motion.div
              className="modal-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowName(false)}
            >
              <motion.div
                className="name-gate"
                initial={{ scale: 0.96, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>怎麼稱呼你？</h2>
                <p>寫在花園牌子上。不想留名也可以。</p>
                <input
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="例如：민지、阿明"
                  maxLength={12}
                  onKeyDown={(e) => e.key === 'Enter' && confirmName()}
                  autoFocus
                />
                <div className="cta-row" style={{ justifyContent: 'center' }}>
                  <button type="button" className="btn-primary" onClick={() => confirmName()}>
                    走進系館
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => confirmName(true)}>
                    匿名散步
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="atmosphere" aria-hidden />
      <div className="shell">
        <nav className="topnav">
          <button type="button" className="brand-mark" onClick={() => goTab('today')}>
            한글산책
            <span>韓文散步</span>
          </button>
          <div className="nav-actions">
            <span className="bloom-pill">{state.blooms} 朵</span>
          </div>
        </nav>

        <div className="tabbar" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id && screen.kind === 'hub'}
              className={`tab${tab === t.id ? ' active' : ''}`}
              onClick={() => goTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {screen.kind === 'hub' && screen.tab === 'today' && (
            <motion.div
              key="today"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TodayPanel
                completed={state.completed}
                daysDone={state.daysDone}
                name={state.name}
                onOpenLesson={openLesson}
                onMarkDay={markDay}
                onOpenStage={(s) => goTab(s)}
              />
            </motion.div>
          )}

          {screen.kind === 'hub' && (screen.tab === 'sounds' || screen.tab === 'spelling') && (
            <motion.div
              key={screen.tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <StagePanel
                stage={screen.tab}
                completed={state.completed}
                onOpenLesson={openLesson}
                onBack={() => goTab('today')}
              />
            </motion.div>
          )}

          {screen.kind === 'hub' && screen.tab === 'vocab' && (
            <motion.div
              key={`vocab-${vocabMode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {vocabMode === 'browse' ? (
                <VocabBrowse onOpenPacks={() => setVocabMode('packs')} />
              ) : (
                <StagePanel
                  stage="vocab"
                  completed={state.completed}
                  onOpenLesson={openLesson}
                  onBack={() => setVocabMode('browse')}
                />
              )}
            </motion.div>
          )}

          {screen.kind === 'hub' && screen.tab === 'garden' && (
            <motion.div
              key="garden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Garden
                blooms={state.blooms}
                total={totalLessons()}
                name={state.name}
                ratio={ratio}
              />
            </motion.div>
          )}

          {screen.kind === 'lesson' && (
            <motion.div
              key={screen.lessonId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {(() => {
                const lesson = getLesson(screen.lessonId)
                if (!lesson) return <p className="hub-panel">找不到這堂課。</p>
                return (
                  <LessonView
                    lesson={lesson}
                    alreadyDone={isDone(lesson.id)}
                    onBack={() => goTab(screen.from)}
                    onComplete={complete}
                  />
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
