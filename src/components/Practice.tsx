import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Practice as PracticeData, TeachItem } from '../data/curriculum'
import { speakKo } from '../lib/speech'

interface Props {
  practice: PracticeData
  teach?: TeachItem[]
  accent?: string
  onSolved: () => void
}

export function Practice({ practice, teach = [], accent = '#e8f4f0', onSolved }: Props) {
  if (practice.kind === 'match' && practice.pairs) {
    return <MatchPractice pairs={practice.pairs} prompt={practice.prompt} onSolved={onSolved} />
  }
  if (practice.kind === 'build' && practice.tiles) {
    return (
      <BuildPractice
        prompt={practice.prompt}
        promptKo={practice.promptKo}
        tiles={practice.tiles}
        answer={practice.answer}
        hint={practice.hint}
        onSolved={onSolved}
      />
    )
  }
  if (practice.kind === 'spell') {
    return (
      <SpellPractice
        prompt={practice.prompt}
        clueZh={practice.clueZh ?? practice.prompt}
        answer={practice.answer}
        hint={practice.hint}
        onSolved={onSolved}
      />
    )
  }
  if (practice.kind === 'flash') {
    return <FlashPractice items={teach} prompt={practice.prompt} onSolved={onSolved} />
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
              onClick={() => {
                if (!matched.has(p.left)) {
                  setSelectedLeft(p.left)
                  speakKo(p.left)
                }
              }}
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
  tiles,
  answer,
  hint,
  onSolved,
}: {
  prompt: string
  promptKo?: string
  tiles: string[]
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
    speakKo(s)
    if (next.join('') === answer.replace(/\s/g, '')) {
      setSolved(true)
      onSolved()
    }
  }

  return (
    <div className="practice-block">
      <p className="practice-label">拼字練習 · 不是考試</p>
      <p className="practice-prompt">{prompt}</p>
      {promptKo && <p className="practice-prompt-ko">{promptKo}</p>}
      <div className="build-tray" onClick={() => !solved && setBuilt([])} title="點這裡清空">
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
        {tiles.map((s) => (
          <button key={s} type="button" className="option-btn" onClick={() => add(s)}>
            {s}
          </button>
        ))}
      </div>
      {hint && !solved && <p className="hint">提示：{hint}</p>}
    </div>
  )
}

function SpellPractice({
  prompt,
  clueZh,
  answer,
  hint,
  onSolved,
}: {
  prompt: string
  clueZh: string
  answer: string
  hint?: string
  onSolved: () => void
}) {
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  const [ok, setOk] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const check = () => {
    const normalized = value.trim().replace(/\s/g, '')
    if (normalized === answer) {
      setOk(true)
      setWrong(false)
      speakKo(answer)
      onSolved()
    } else {
      setWrong(true)
      setTimeout(() => setWrong(false), 450)
    }
  }

  return (
    <div className="practice-block">
      <p className="practice-label">今日拼字 · 不是考試</p>
      <p className="practice-prompt">{prompt}</p>
      <p className="practice-prompt-ko" style={{ fontFamily: 'var(--font-zh)', fontSize: '1.35rem' }}>
        {clueZh}
      </p>
      <div className="spell-row">
        <input
          className={`spell-input${wrong ? ' wrong' : ''}${ok ? ' correct' : ''}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          placeholder="在這裡打韓文"
          disabled={ok}
          autoCapitalize="off"
          autoCorrect="off"
        />
        <button type="button" className="btn-primary" onClick={check} disabled={ok}>
          {ok ? '對了' : '檢查'}
        </button>
      </div>
      <div className="spell-tools">
        <button type="button" className="btn-ghost" onClick={() => speakKo(answer)}>
          聽正確發音
        </button>
        <button type="button" className="btn-ghost" onClick={() => setShowHint(true)}>
          看提示
        </button>
      </div>
      {showHint && hint && <p className="hint">提示：{hint}</p>}
    </div>
  )
}

function FlashPractice({
  items,
  prompt,
  onSolved,
}: {
  items: TeachItem[]
  prompt: string
  onSolved: () => void
}) {
  const [i, setI] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [seen, setSeen] = useState(0)
  const item = items[i]

  if (!item) return null

  const next = () => {
    const n = seen + 1
    setSeen(n)
    if (n >= items.length) {
      onSolved()
      return
    }
    setI((i + 1) % items.length)
    setRevealed(false)
  }

  return (
    <div className="practice-block">
      <p className="practice-label">閃卡＋句子 · 不是考試</p>
      <p className="practice-prompt">{prompt}</p>
      <div
        className="flash-card"
        onClick={() => {
          setRevealed(true)
          speakKo(item.example || item.ko)
        }}
      >
        <p className="flash-ko">{item.ko}</p>
        {item.example && <p className="flash-sentence">{item.example}</p>}
        {revealed ? (
          <>
            <p className="flash-zh">
              {item.zh}
              {item.roman ? ` · ${item.roman}` : ''}
            </p>
            {item.exampleZh && <p className="flash-sentence-zh">{item.exampleZh}</p>}
          </>
        ) : (
          <p className="flash-zh mute">點一下顯示意思與翻譯</p>
        )}
      </div>
      <div className="cta-row">
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            setRevealed(true)
            speakKo(item.example || item.ko)
          }}
        >
          顯示意思
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => speakKo(item.example || item.ko)}
        >
          聽句子
        </button>
        <button type="button" className="btn-primary" onClick={next} disabled={!revealed}>
          {seen + 1 >= items.length ? '看完了' : '下一個'}
        </button>
      </div>
      <p className="hint">
        {Math.min(seen + (revealed ? 1 : 0), items.length)} / {items.length}
      </p>
    </div>
  )
}
