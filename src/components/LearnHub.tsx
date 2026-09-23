import { motion } from 'framer-motion'
import {
  lessonsByStage,
  nextIncomplete,
  pathDays,
  type Stage,
} from '../data/curriculum'

interface Props {
  completed: string[]
  daysDone: number[]
  name: string
  onOpenLesson: (id: string) => void
  onMarkDay: (day: number) => void
  onOpenStage: (stage: Stage) => void
}

export function TodayPanel({
  completed,
  daysDone,
  name,
  onOpenLesson,
  onMarkDay,
  onOpenStage,
}: Props) {
  const next = nextIncomplete(completed)
  const currentDay = next?.day.day ?? pathDays.length
  const dayMeta = pathDays.find((d) => d.day === currentDay) ?? pathDays[pathDays.length - 1]
  const dayDone = daysDone.includes(dayMeta.day)
  const dayLessonsDone = dayMeta.lessonIds.every((id) => completed.includes(id))

  return (
    <div className="hub-panel">
      <header className="hub-hero">
        <p className="section-kicker">今日 · 自學</p>
        <h2 className="section-title">{name ? `${name}，今天走這一步` : '今天走這一步'}</h2>
        <p className="section-blurb">
          和德文程式同一節奏：先九音 → 再拼字 → 再單字。沒有考試，做完自己按「我會了」。
        </p>
      </header>

      <div className="ritual">
        <motion.button
          type="button"
          className="ritual-step"
          onClick={() => (next ? onOpenLesson(next.lesson.id) : onOpenStage('vocab'))}
          whileHover={{ x: 4 }}
        >
          <span className="ritual-num">①</span>
          <div>
            <h3>{dayMeta.title}</h3>
            <p>{next ? next.lesson.title : '全部走完了——可以回顧單字'}</p>
          </div>
          <span className="ritual-go">{next ? '開始 →' : '複習 →'}</span>
        </motion.button>

        <button type="button" className="ritual-step" onClick={() => onOpenStage('sounds')}>
          <span className="ritual-num">②</span>
          <div>
            <h3>九音／發音</h3>
            <p>母音九音＋子音積木，點字就能聽。</p>
          </div>
          <span className="ritual-go">打開 →</span>
        </button>

        <button type="button" className="ritual-step" onClick={() => onOpenStage('spelling')}>
          <span className="ritual-num">③</span>
          <div>
            <h3>拼字</h3>
            <p>組音節、看中文打韓文——對齊德文拼字小測驗。</p>
          </div>
          <span className="ritual-go">打開 →</span>
        </button>

        <button type="button" className="ritual-step" onClick={() => onOpenStage('vocab')}>
          <span className="ritual-num">④</span>
          <div>
            <h3>單字路徑</h3>
            <p>打招呼、自我介紹、咖啡館——一批一批收。</p>
          </div>
          <span className="ritual-go">打開 →</span>
        </button>
      </div>

      <div className="day-tip">
        <p>
          <strong>小叮嚀：</strong>
          {dayMeta.tip}
        </p>
        {dayLessonsDone && !dayDone && (
          <button type="button" className="btn-primary" onClick={() => onMarkDay(dayMeta.day)}>
            標記 Day {dayMeta.day} 完成
          </button>
        )}
        {dayDone && <p className="lesson-done">Day {dayMeta.day} 已完成 ✓</p>}
      </div>
    </div>
  )
}

interface StageProps {
  stage: Stage
  completed: string[]
  onOpenLesson: (id: string) => void
  onBack: () => void
}

const stageCopy: Record<Stage, { title: string; ko: string; blurb: string }> = {
  sounds: {
    title: '九音／發音',
    ko: '모음 · 자음',
    blurb: '先把聲音聽進身體。對齊德文「字母與發音要點」。',
  },
  spelling: {
    title: '拼字',
    ko: '받아쓰기',
    blurb: '組音節、打字練習。對齊德文「今日拼字小測驗」。',
  },
  vocab: {
    title: '單字路徑',
    ko: '단어 길',
    blurb: '一批一批收單字。閃卡＋拼字，不考試。',
  },
}

export function StagePanel({ stage, completed, onOpenLesson, onBack }: StageProps) {
  const list = lessonsByStage(stage)
  const copy = stageCopy[stage]

  return (
    <div className="hub-panel">
      <button type="button" className="back-btn" onClick={onBack}>
        ← 今日
      </button>
      <header className="hub-hero">
        <p className="section-kicker">{copy.ko}</p>
        <h2 className="section-title">{copy.title}</h2>
        <p className="section-blurb">{copy.blurb}</p>
      </header>

      <div className="lesson-list">
        {list.map((lesson, i) => {
          const done = completed.includes(lesson.id)
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
                  {lesson.titleKo} · {lesson.minutes} 分鐘
                </p>
              </div>
              {done ? <span className="lesson-done">我會了</span> : <span className="path-meta">學 →</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
