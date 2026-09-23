import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Lesson } from '../data/curriculum'
import { Practice } from './Practice'
import { speakKo } from '../lib/speech'

interface Props {
  lesson: Lesson
  alreadyDone: boolean
  onBack: () => void
  onComplete: (lessonId: string) => void
}

export function LessonView({ lesson, alreadyDone, onBack, onComplete }: Props) {
  const [practiced, setPracticed] = useState(alreadyDone)
  const [marked, setMarked] = useState(alreadyDone)

  const stageLabel =
    lesson.stage === 'sounds' ? '九音／發音' : lesson.stage === 'spelling' ? '拼字' : '單字'

  const finishPractice = () => setPracticed(true)

  const markLearned = () => {
    setMarked(true)
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
        ← 回自學
      </button>

      <p className="lesson-mood">
        {stageLabel} · 約 {lesson.minutes} 分鐘
      </p>
      <h1 className="lesson-title">{lesson.title}</h1>
      <p className="lesson-title-ko">{lesson.titleKo}</p>
      <p className="lesson-story">{lesson.summary}</p>

      <ul className="point-list">
        {lesson.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <h2 className="block-title">先教 · 聽一聽</h2>
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
            <button
              type="button"
              className="teach-ko speakable"
              onClick={() => speakKo(row.ko)}
              title="點我發音"
            >
              {row.ko}
            </button>
            <div>
              <p className="teach-zh">{row.zh}</p>
              <p className="teach-meta">
                {row.roman}
                {row.note ? ` · ${row.note}` : ''}
              </p>
              {row.example && (
                <button
                  type="button"
                  className="teach-example"
                  onClick={() => speakKo(row.example!)}
                  title="聽例句"
                >
                  <span className="ex-ko">{row.example}</span>
                  {row.exampleZh && <span className="ex-zh">{row.exampleZh}</span>}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="block-title">再練 · 不用考試</h2>
      <Practice
        key={lesson.id}
        practice={lesson.practice}
        teach={lesson.teach}
        onSolved={finishPractice}
      />

      {practiced && (
        <motion.div
          className="joy-banner"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p>{lesson.joy}</p>
          {!marked ? (
            <button type="button" className="btn-primary" onClick={markLearned}>
              標記我會了
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={onBack}>
              回今日進度 · 花園又多一朵
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}
