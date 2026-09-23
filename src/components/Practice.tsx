import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PracticeItem } from '../data/curriculum'

interface Props {
  practice: PracticeItem
  accent?: string
  onSolved: () => void
}

export function Practice({ practice, accent = '#e8f4f0', onSolved }: Props) {
  if (practice.kind === 'match' && practice.pairs) {
    return <MatchPractice pairs={practice.pairs} prompt={practice.prompt} onSolved={onSolved} />
  }
  if (practice.kind === 'build' && practice.syllables) {
    return (
      <BuildPractice
        prompt={practice.prompt}
        promptKo={practice.promptKo}
        syllables={practice.syllables}
        answer={practice.answer}
        hint={practice.hint}
        onSolved={onSolved}
      />
    )
  }
  return (
    <PickPractice
      prompt={practice.prompt}
      promptKo={practice.promptKo}
      options={practice.options ?? []}
      answer={practice.answer}
      hint={practice.hint}
      accent={accent}
      onSolved={onSolved}
    />
  )
}

function PickPractice({
  prompt,
  promptKo,
  options,
  answer,
  hint,
  accent,
  onSolved,
}: {
  prompt: string
  promptKo?: string
  options: string[]
  answer: string
  hint?: string
  accent: string
  onSolved: () => void
}) {
  const [picked, setPicked] = useState<string | null>(null)
  const [wrong, setWrong] = useState<string | null>(null)

  const choose = (opt: string) => {
    if (picked === answer) return
    if (opt === answer) {
      setPicked(opt)
      setWrong(null)
      onSolved()
    } else {
      setWrong(opt)
      setTimeout(() => setWrong(null), 450)
    }
  }

  return (
    <div className="practice-block">
      <p className="practice-label">輕鬆練習 · 不是考試</p>
      <p className="practice-prompt">{prompt}</p>
      {promptKo && <p className="practice-prompt-ko">{promptKo}</p>}
      <div className="option-grid">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`option-btn${picked === opt ? ' correct' : ''}${wrong === opt ? ' wrong' : ''}`}
            style={picked === opt ? { ['--accent' as string]: accent } : undefined}
            onClick={() => choose(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      {hint && picked !== answer && <p className="hint">提示：{hint}</p>}
    </div>
  )
}

function MatchPractice({
  pairs,
  prompt,
  onSolved,
}: {
  pairs: { left: string; right: string }[]
  prompt: string
  onSolved: () => void
}) {
  const rights = useMemo(() => {
    const arr = pairs.map((p) => p.right)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [pairs])

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())

  const tryMatch = (right: string) => {
    if (!selectedLeft || matched.has(selectedLeft)) return
    const pair = pairs.find((p) => p.left === selectedLeft)
    if (pair?.right === right) {
      const next = new Set(matched)
      next.add(selectedLeft)
      setMatched(next)
      setSelectedLeft(null)
      if (next.size === pairs.length) onSolved()
    } else {
      setSelectedLeft(null)
    }
  }

  return (
    <div className="practice-block">
      <p className="practice-label">輕鬆練習 · 不是考試</p>
      <p className="practice-prompt">{prompt}</p>
      <div className="match-board">
        <div className="match-col">
          {pairs.map((p) => (
            <button
              key={p.left}
              type="button"
              className={`match-item${selectedLeft === p.left ? ' selected' : ''}${matched.has(p.left) ? ' done' : ''}`}
              onClick={() => !matched.has(p.left) && setSelectedLeft(p.left)}
              disabled={matched.has(p.left)}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="match-col">
          {rights.map((r) => {
            const left = pairs.find((p) => p.right === r)?.left
            const done = left ? matched.has(left) : false
            return (
              <button
                key={r}
                type="button"
                className={`match-item${done ? ' done' : ''}`}
                onClick={() => !done && tryMatch(r)}
                disabled={done}
              >
                {r}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function BuildPractice({
  prompt,
  promptKo,
  syllables,
  answer,
  hint,
  onSolved,
}: {
  prompt: string
  promptKo?: string
  syllables: string[]
  answer: string
  hint?: string
  onSolved: () => void
}) {
  const [built, setBuilt] = useState<string[]>([])
  const [solved, setSolved] = useState(false)

  const add = (s: string) => {
    if (solved) return
    const next = [...built, s]
    setBuilt(next)
    if (next.join('') === answer.replace(/\s/g, '')) {
      setSolved(true)
      onSolved()
    }
  }

  const clear = () => {
    if (solved) return
    setBuilt([])
  }

  return (
    <div className="practice-block">
      <p className="practice-label">輕鬆練習 · 不是考試</p>
      <p className="practice-prompt">{prompt}</p>
      {promptKo && <p className="practice-prompt-ko">{promptKo}</p>}
      <div className="build-tray" onClick={clear} title="點這裡清空重拼">
        <AnimatePresence>
          {built.length === 0 && !solved && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              style={{ fontSize: '0.9rem', color: 'var(--ink-soft)' }}
            >
              點下方積木來拼 · 點這裡可清空
            </motion.span>
          )}
          {built.map((s, i) => (
            <motion.span
              key={`${s}-${i}`}
              className="build-chip"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {s}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div className="option-grid">
        {syllables.map((s) => (
          <button key={s} type="button" className="option-btn" onClick={() => add(s)}>
            {s}
          </button>
        ))}
      </div>
      {hint && !solved && <p className="hint">提示：{hint}</p>}
    </div>
  )
}
