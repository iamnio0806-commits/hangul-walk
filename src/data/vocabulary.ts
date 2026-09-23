import raw from './vocabulary.json'

export type Category =
  | '問候'
  | '人物'
  | '家庭'
  | '飲食'
  | '咖啡館'
  | '購物'
  | '時間'
  | '地方'
  | '動詞'
  | '形容詞'
  | '數字'
  | '交通'
  | '天氣'
  | '感覺'
  | '學校'
  | '日常'
  | '旅行'
  | '身體'
  | '顏色'
  | '工作'
  | '自然'

export interface VocabWord {
  id: string
  ko: string
  zh: string
  roman: string
  category: Category
  example: string
  exampleZh: string
  level: string
}

export const vocabulary = raw as VocabWord[]

export const categories: Category[] = [
  ...new Set(vocabulary.map((w) => w.category)),
] as Category[]

export function byCategory(cat: Category | '全部') {
  if (cat === '全部') return vocabulary
  return vocabulary.filter((w) => w.category === cat)
}

export function searchVocab(q: string) {
  const s = q.trim().toLowerCase()
  if (!s) return vocabulary
  return vocabulary.filter(
    (w) =>
      w.ko.includes(s) ||
      w.zh.includes(s) ||
      w.roman.toLowerCase().includes(s) ||
      w.example.includes(s) ||
      w.exampleZh.includes(s),
  )
}

/** Pack words into learnable lesson-sized batches */
export function vocabPacks(size = 8): { id: string; category: Category; words: VocabWord[] }[] {
  const packs: { id: string; category: Category; words: VocabWord[] }[] = []
  for (const cat of categories) {
    const list = byCategory(cat)
    for (let i = 0; i < list.length; i += size) {
      const slice = list.slice(i, i + size)
      const n = Math.floor(i / size) + 1
      packs.push({
        id: `vocab-${cat}-${n}`,
        category: cat,
        words: slice,
      })
    }
  }
  return packs
}
