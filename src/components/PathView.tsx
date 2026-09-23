import { motion } from 'framer-motion'
import { paths } from '../data/curriculum'

interface Props {
  pathId: string
  isDone: (id: string) => boolean
  onBack: () => void
  onOpenLesson: (lessonId: string) => void
}

export function PathView({ pathId, isDone, onBack, onOpenLesson }: Props) {
  const path = paths.find((p) => p.id === pathId)
  if (!path) return null

  const doneCount = path.lessons.filter((l) => isDone(l.id)).length

  return (
    <motion.div
      className="path-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <button type="button" className="back-btn" onClick={onBack}>
        ← 한글산책
      </button>

      <header className="path-header">
        <h1>
          <span className="path-dot" style={{ background: path.color }} />
          {path.name}
        </h1>
        <p className="ko">{path.nameKo}</p>
        <p>
          {path.blurb} 已散步 {doneCount}/{path.lessons.length} 堂。
        </p>
      </header>

      <div className="lesson-list">
        {path.lessons.map((lesson, i) => {
          const done = isDone(lesson.id)
          return (
            <button
              key={lesson.id}
              type="button"
              className="lesson-item"
              onClick={() => onOpenLesson(lesson.id)}
            >
              <span className="lesson-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{lesson.title}</h3>
                <p>
                  {lesson.titleKo} · {lesson.minutes} 分鐘 · {lesson.mood}
                </p>
              </div>
              {done ? <span className="lesson-done">已走過</span> : <span className="path-meta">走吧 →</span>}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
