import { useState } from 'react'
import { motion } from 'framer-motion'
import { getLesson } from '../data/curriculum'
import { Practice } from './Practice'

interface Props {
  pathId: string
  lessonId: string
  alreadyDone: boolean
  onBack: () => void
  onComplete: (lessonId: string) => void
}

export function LessonView({ pathId, lessonId, alreadyDone, onBack, onComplete }: Props) {
  const { path, lesson } = getLesson(pathId, lessonId)
  const [solved, setSolved] = useState(alreadyDone)

  if (!path || !lesson) {
    return (
      <div className="lesson-page">
        <button type="button" className="back-btn" onClick={onBack}>
          ← 回去
        </button>
        <p>找不到這堂課。</p>
      </div>
    )
  }

  const finish = () => {
    setSolved(true)
    onComplete(lesson.id)
  }

  return (
    <motion.div
      className="lesson-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <button type="button" className="back-btn" onClick={onBack}>
        ← {path.name}
      </button>

      <p className="lesson-mood">{lesson.mood} · 約 {lesson.minutes} 分鐘</p>
      <h1 className="lesson-title">{lesson.title}</h1>
      <p className="lesson-title-ko">{lesson.titleKo}</p>
      <p className="lesson-story">{lesson.story}</p>

      <div className="teach-grid">
        {lesson.teach.map((row) => (
          <motion.div
            key={row.ko}
            className="teach-row"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
          >
            <span className="teach-ko">{row.ko}</span>
            <div>
              <p className="teach-zh">{row.zh}</p>
              <p className="teach-meta">
                {row.roman}
                {row.note ? ` · ${row.note}` : ''}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <Practice
        key={lesson.id}
        practice={lesson.practice}
        accent={path.accent}
        onSolved={finish}
      />

      {solved && (
        <motion.div
          className="joy-banner"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>{lesson.joy}</p>
          <button type="button" className="btn-primary" onClick={onBack}>
            回小徑 · 花園又多一朵
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
