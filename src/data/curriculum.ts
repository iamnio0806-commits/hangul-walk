/** 한글산책 — sounds → spelling → vocab+sentences (no exams) */

import { vocabPacks, type VocabWord } from './vocabulary'

export type Stage = 'sounds' | 'spelling' | 'vocab'

export interface TeachItem {
  ko: string
  zh: string
  roman?: string
  note?: string
  example?: string
  exampleZh?: string
}

export type PracticeKind = 'match' | 'pick' | 'build' | 'spell' | 'flash'

export interface Practice {
  kind: PracticeKind
  prompt: string
  promptKo?: string
  options?: string[]
  answer: string
  hint?: string
  pairs?: { left: string; right: string }[]
  tiles?: string[]
  clueZh?: string
}

export interface Lesson {
  id: string
  stage: Stage
  order: number
  title: string
  titleKo: string
  minutes: number
  summary: string
  points: string[]
  teach: TeachItem[]
  practice: Practice
  joy: string
}

export const NINE_SOUNDS: TeachItem[] = [
  { ko: 'ㅏ', zh: '啊', roman: 'a', note: '嘴巴向右開，像「啊」', example: '아', exampleZh: '啊（感嘆）' },
  { ko: 'ㅓ', zh: '呃', roman: 'eo', note: '比喔更扁，舌往後' },
  { ko: 'ㅗ', zh: '喔', roman: 'o', note: '嘴唇圓圓往前' },
  { ko: 'ㅜ', zh: '嗚', roman: 'u', note: '嘟嘴，像吹氣' },
  { ko: 'ㅡ', zh: '嗯（扁）', roman: 'eu', note: '嘴成一條線' },
  { ko: 'ㅣ', zh: '衣', roman: 'i', note: '一條豎線，聲音亮' },
  { ko: 'ㅐ', zh: '欸', roman: 'ae', note: 'ㅏ + ㅣ 的感覺' },
  { ko: 'ㅔ', zh: '欸（稍扁）', roman: 'e', note: '和 ㅐ 很像，先聽感' },
  { ko: 'ㅚ', zh: '威（圓）', roman: 'oe', note: 'ㅗ + ㅣ，嘴唇圓' },
]

export const CORE_CONSONANTS: TeachItem[] = [
  { ko: 'ㄱ', zh: 'g/k', roman: 'g', note: '輕碰軟顎' },
  { ko: 'ㄴ', zh: 'n', roman: 'n', note: '舌尖抵上牙齦' },
  { ko: 'ㄷ', zh: 'd/t', roman: 'd', note: '舌尖輕彈' },
  { ko: 'ㄹ', zh: 'r/l', roman: 'r', note: '輕彈一下' },
  { ko: 'ㅁ', zh: 'm', roman: 'm', note: '雙唇合上' },
  { ko: 'ㅂ', zh: 'b/p', roman: 'b', note: '雙唇爆破' },
  { ko: 'ㅅ', zh: 's', roman: 's', note: '氣流從齒縫' },
  { ko: 'ㅇ', zh: '（開頭無聲）/ ng', roman: 'ng', note: '開頭當占位，結尾是 ng' },
  { ko: 'ㅈ', zh: 'j', roman: 'j', note: '像「基」的開頭' },
  { ko: 'ㅎ', zh: 'h', roman: 'h', note: '輕呼氣' },
]

const foundationLessons: Lesson[] = [
  {
    id: 'sound-nine',
    stage: 'sounds',
    order: 1,
    title: '九音：先把母音聽進身體',
    titleKo: '모음 아홉',
    minutes: 12,
    summary: '和德文先學字母發音一樣——韓文也從聲音開始。今天只認識九個母音，不考試、不計時。',
    points: [
      '先聽再說，嘴巴形狀比死背重要',
      'ㅏㅓㅗㅜㅡㅣ 是骨架，ㅐㅔㅚ 是常用延伸',
      '聽不懂再點一次喇叭，錯了也沒關係',
    ],
    teach: NINE_SOUNDS,
    practice: {
      kind: 'match',
      prompt: '把九音和中文感覺連起來。',
      pairs: [
        { left: 'ㅏ', right: '啊 · a' },
        { left: 'ㅗ', right: '喔 · o' },
        { left: 'ㅣ', right: '衣 · i' },
        { left: 'ㅜ', right: '嗚 · u' },
        { left: 'ㅐ', right: '欸 · ae' },
      ],
      answer: 'matched',
    },
    joy: '九音入門完成。接下來用它們拼出真正的字。',
  },
  {
    id: 'sound-consonants',
    stage: 'sounds',
    order: 2,
    title: '子音積木',
    titleKo: '자음 쌓기',
    minutes: 10,
    summary: '母音會「唱」，子音會「擋」。十個最常用子音，當成拼字積木。',
    points: [
      'ㅇ 開頭常常沒聲音，只是占位子',
      'ㄱㄴㅁㅅㅂ 出現超頻繁，先混臉熟',
      '先認得形狀，發音慢慢準就好',
    ],
    teach: CORE_CONSONANTS,
    practice: {
      kind: 'pick',
      prompt: '「媽媽」엄마 的開頭子音是？',
      options: ['ㅁ', 'ㄱ', 'ㅅ', 'ㅂ'],
      answer: 'ㅁ',
      hint: '嘴唇合起來的那個。',
    },
    joy: '積木齊了。可以開始拼音節。',
  },
  {
    id: 'spell-syllable',
    stage: 'spelling',
    order: 3,
    title: '拼出第一格：나',
    titleKo: '첫 음절',
    minutes: 12,
    summary: '韓文一格＝一個音節。左邊／上面放子音，右邊／下面放母音。',
    points: [
      '나 = ㄴ + ㅏ',
      '가로형：子音在左、母音在右（ㅏㅓㅣ…）',
      '세로형：子音在上、母音在下（ㅗㅜㅡ…）',
    ],
    teach: [
      { ko: '나', zh: '我', roman: 'na', note: 'ㄴ + ㅏ', example: '나는 학생이에요.', exampleZh: '我是學生。' },
      { ko: '너', zh: '你（親）', roman: 'neo', note: 'ㄴ + ㅓ', example: '너는 이름이 뭐야?', exampleZh: '你叫什麼名字？' },
      { ko: '고', zh: '且／去', roman: 'go', note: 'ㄱ + ㅗ' },
      { ko: '미', zh: '美', roman: 'mi', note: 'ㅁ + ㅣ' },
      { ko: '수', zh: '水／數', roman: 'su', note: 'ㅅ + ㅜ' },
      { ko: '이', zh: '這／名字尾', roman: 'i', note: 'ㅇ + ㅣ（ㅇ 無聲）', example: '이름이 뭐예요?', exampleZh: '名字是什麼？' },
    ],
    practice: {
      kind: 'build',
      prompt: '拼出「我」나——選對積木。',
      promptKo: '나',
      tiles: ['ㄴ', 'ㅏ', 'ㅁ', 'ㅓ', 'ㄱ'],
      answer: 'ㄴㅏ',
      hint: '子音在左：ㄴ + ㅏ',
    },
    joy: '你拼出了나。拼字關卡正式打開。',
  },
  {
    id: 'spell-type',
    stage: 'spelling',
    order: 4,
    title: '今日拼字：看中文打韓文',
    titleKo: '받아쓰기',
    minutes: 10,
    summary: '對齊德文「今日拼字小測驗」——看到中文，試著打出韓文。錯了重來，不算分。',
    points: ['可以看提示，不丢人', '打得出來比打得快重要', '完成一次就標記「我會了」'],
    teach: [
      { ko: '물', zh: '水', roman: 'mul', note: 'ㅁ + ㅜ + ㄹ', example: '물 한 잔 주세요.', exampleZh: '請給我一杯水。' },
      { ko: '불', zh: '火', roman: 'bul', note: 'ㅂ + ㅜ + ㄹ' },
      { ko: '손', zh: '手', roman: 'son', note: 'ㅅ + ㅗ + ㄴ', example: '손을 씻어요.', exampleZh: '洗手。' },
      { ko: '발', zh: '腳', roman: 'bal', note: 'ㅂ + ㅏ + ㄹ', example: '발이 아파요.', exampleZh: '腳痛。' },
      { ko: '눈', zh: '眼睛／雪', roman: 'nun', note: 'ㄴ + ㅜ + ㄴ', example: '눈이 커요.', exampleZh: '眼睛很大。' },
    ],
    practice: {
      kind: 'spell',
      prompt: '看中文，打出韓文單字。',
      clueZh: '水',
      answer: '물',
      hint: 'mul · ㅁㅜㄹ',
    },
    joy: '拼字肌肉開始發熱了。下一步：把字收進單字路徑。',
  },
]

function wordToTeach(w: VocabWord): TeachItem {
  return {
    ko: w.ko,
    zh: w.zh,
    roman: w.roman,
    example: w.example,
    exampleZh: w.exampleZh,
  }
}

function packToLesson(pack: ReturnType<typeof vocabPacks>[number], order: number): Lesson {
  const teach = pack.words.map(wordToTeach)
  const sample = pack.words[0]
  const second = pack.words[1] ?? pack.words[0]
  const practice: Practice =
    order % 3 === 0
      ? {
          kind: 'spell',
          prompt: '看中文，打出韓文（今日拼字）。',
          clueZh: sample.zh,
          answer: sample.ko,
          hint: sample.roman,
        }
      : order % 3 === 1
        ? {
            kind: 'pick',
            prompt: `「${sample.zh}」用韓文怎麼說？`,
            options: [sample.ko, second.ko, pack.words[2]?.ko ?? '네', pack.words[3]?.ko ?? '물'].filter(
              (v, i, a) => a.indexOf(v) === i,
            ),
            answer: sample.ko,
          }
        : {
            kind: 'flash',
            prompt: '閃卡：先看單字與句子，再翻開意思。全部看過就算完成。',
            answer: 'done',
          }

  return {
    id: pack.id,
    stage: 'vocab',
    order,
    title: `單字＋句子：${pack.category}`,
    titleKo: pack.category,
    minutes: 12,
    summary: `這一包 ${pack.words.length} 個「${pack.category}」單字，每個都附例句——像德文站一樣，單字要活在句子裡。`,
    points: [
      '先聽單字，再聽整句',
      '例句裡一定有這個詞',
      '不考試；標記「我會了」即可',
    ],
    teach,
    practice,
    joy: `「${pack.category}」這一包收進口袋了。句子比單字記得更牢。`,
  }
}

const vocabLessons = vocabPacks(8).map((p, i) => packToLesson(p, 5 + i))

export const lessons: Lesson[] = [...foundationLessons, ...vocabLessons]

export interface PathDay {
  day: number
  title: string
  tip: string
  lessonIds: string[]
  focus: Stage
}

export const pathDays: PathDay[] = [
  {
    day: 1,
    title: 'Day 1 · 九音',
    tip: '今天只做母音。聽、對嘴型，別急著背整張表。',
    lessonIds: ['sound-nine'],
    focus: 'sounds',
  },
  {
    day: 2,
    title: 'Day 2 · 子音積木',
    tip: '把子音當積木認臉。拼字明天才上場。',
    lessonIds: ['sound-consonants'],
    focus: 'sounds',
  },
  {
    day: 3,
    title: 'Day 3 · 拼出第一格',
    tip: '子音＋母音＝一格。拼對나 就過關。',
    lessonIds: ['spell-syllable'],
    focus: 'spelling',
  },
  {
    day: 4,
    title: 'Day 4 · 拼字小測驗',
    tip: '看中文打韓文——和德文今日拼字同一肌肉。',
    lessonIds: ['spell-type'],
    focus: 'spelling',
  },
  ...vocabLessons.map((l, i) => ({
    day: 5 + i,
    title: `Day ${5 + i} · ${l.title.replace('單字＋句子：', '')}`,
    tip: '單字要配句子一起收。聽完例句再標記我會了。',
    lessonIds: [l.id],
    focus: 'vocab' as Stage,
  })),
]

export function getLesson(id: string) {
  return lessons.find((l) => l.id === id)
}

export function lessonsByStage(stage: Stage) {
  return lessons.filter((l) => l.stage === stage).sort((a, b) => a.order - b.order)
}

export function totalLessons() {
  return lessons.length
}

export function totalVocabWords() {
  return vocabPacks(8).reduce((n, p) => n + p.words.length, 0)
}

export function nextIncomplete(completed: string[]) {
  for (const day of pathDays) {
    for (const id of day.lessonIds) {
      if (!completed.includes(id)) {
        const lesson = getLesson(id)
        if (lesson) return { day, lesson }
      }
    }
  }
  return null
}
