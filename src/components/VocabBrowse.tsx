import { useMemo, useState } from 'react'
import {
  categories,
  searchVocab,
  vocabulary,
  type Category,
  type VocabWord,
} from '../data/vocabulary'
import { speakKo } from '../lib/speech'

interface Props {
  onOpenPacks: () => void
}

export function VocabBrowse({ onOpenPacks }: Props) {
  const [cat, setCat] = useState<Category | '全部'>('全部')
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const list = useMemo(() => {
    const base = q.trim() ? searchVocab(q) : vocabulary
    if (cat === '全部') return base
    return base.filter((w) => w.category === cat)
  }, [cat, q])

  return (
    <div className="hub-panel">
      <header className="hub-hero">
        <p className="section-kicker">단어 · 單字庫</p>
        <h2 className="section-title">單字＋句子</h2>
        <p className="section-blurb">
          共 {vocabulary.length} 個入門單字，每個都有例句——和德文站一樣，字要活在句子裡。
        </p>
      </header>

      <div className="cta-row" style={{ marginBottom: '1.25rem' }}>
        <button type="button" className="btn-primary" onClick={onOpenPacks}>
          走單字路徑課 →
        </button>
      </div>

      <input
        className="vocab-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜尋韓文／中文／羅馬拼音／句子…"
      />

      <div className="cat-row">
        <button
          type="button"
          className={`cat-chip${cat === '全部' ? ' active' : ''}`}
          onClick={() => setCat('全部')}
        >
          全部
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`cat-chip${cat === c ? ' active' : ''}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="progress-label" style={{ marginBottom: '0.75rem' }}>
        顯示 {list.length} 個
      </p>

      <div className="vocab-list">
        {list.map((w) => (
          <VocabRow
            key={w.id}
            word={w}
            open={openId === w.id}
            onToggle={() => setOpenId(openId === w.id ? null : w.id)}
          />
        ))}
      </div>
    </div>
  )
}

function VocabRow({
  word,
  open,
  onToggle,
}: {
  word: VocabWord
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className={`vocab-row${open ? ' open' : ''}`}>
      <button type="button" className="vocab-main" onClick={onToggle}>
        <span className="vocab-ko">{word.ko}</span>
        <span className="vocab-zh">{word.zh}</span>
        <span className="vocab-cat">{word.category}</span>
      </button>
      {open && (
        <div className="vocab-detail">
          <p className="teach-meta">{word.roman}</p>
          <button type="button" className="teach-example" onClick={() => speakKo(word.example)}>
            <span className="ex-ko">{word.example}</span>
            <span className="ex-zh">{word.exampleZh}</span>
          </button>
          <div className="spell-tools">
            <button type="button" className="btn-ghost" onClick={() => speakKo(word.ko)}>
              聽單字
            </button>
            <button type="button" className="btn-ghost" onClick={() => speakKo(word.example)}>
              聽句子
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
