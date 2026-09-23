/** 한글산책 — mirrored from Wortklang selflearn: sounds → spelling → vocab (no exams) */

export type Stage = 'sounds' | 'spelling' | 'vocab'

export interface TeachItem {
  ko: string
  zh: string
  roman?: string
  note?: string
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
  /** for spell: Chinese clue → type Korean */
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

/** 九音：韓文入門最常用的九個母音（對齊德文「先教發音」） */
export const NINE_SOUNDS: TeachItem[] = [
  { ko: 'ㅏ', zh: '啊', roman: 'a', note: '嘴巴向右開，像「啊」' },
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

export const lessons: Lesson[] = [
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
      prompt: '把九音和中文感覺連起來（不必一次全對，連完就好）。',
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
      { ko: '나', zh: '我', roman: 'na', note: 'ㄴ + ㅏ' },
      { ko: '너', zh: '你（親）', roman: 'neo', note: 'ㄴ + ㅓ' },
      { ko: '고', zh: '且／去', roman: 'go', note: 'ㄱ + ㅗ' },
      { ko: '미', zh: '美', roman: 'mi', note: 'ㅁ + ㅣ' },
      { ko: '수', zh: '水／數', roman: 'su', note: 'ㅅ + ㅜ' },
      { ko: '이', zh: '這／名字尾', roman: 'i', note: 'ㅇ + ㅣ（ㅇ 無聲）' },
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
    points: [
      '可以看提示，不丢人',
      '打得出來比打得快重要',
      '完成一次就標記「我會了」',
    ],
    teach: [
      { ko: '물', zh: '水', roman: 'mul', note: 'ㅁ + ㅜ + ㄹ' },
      { ko: '불', zh: '火', roman: 'bul', note: 'ㅂ + ㅜ + ㄹ' },
      { ko: '손', zh: '手', roman: 'son', note: 'ㅅ + ㅗ + ㄴ' },
      { ko: '발', zh: '腳', roman: 'bal', note: 'ㅂ + ㅏ + ㄹ' },
      { ko: '눈', zh: '眼睛／雪', roman: 'nun', note: 'ㄴ + ㅜ + ㄴ' },
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
  {
    id: 'vocab-hello',
    stage: 'vocab',
    order: 5,
    title: '單字：打招呼的溫度',
    titleKo: '인사 단어',
    minutes: 10,
    summary: '聲音和拼字穩了，開始收單字。今天五個見面就用得到的詞。',
    points: [
      '안녕하세요＝標準問候',
      '謝謝有正式／隨和兩種溫度',
      '閃卡：先聽 → 猜 → 翻開',
    ],
    teach: [
      { ko: '안녕하세요', zh: '你好（禮貌）', roman: 'annyeonghaseyo' },
      { ko: '안녕', zh: '嗨／掰', roman: 'annyeong' },
      { ko: '감사합니다', zh: '謝謝（正式）', roman: 'gamsahamnida' },
      { ko: '고마워', zh: '謝謝（親）', roman: 'gomawo' },
      { ko: '네', zh: '是／好的', roman: 'ne' },
    ],
    practice: {
      kind: 'flash',
      prompt: '閃卡練習：先想意思，再翻開。全部看過就算完成。',
      answer: 'done',
    },
    joy: '單字路徑第一站完成。明天還可以再收一批。',
  },
  {
    id: 'vocab-me',
    stage: 'vocab',
    order: 6,
    title: '單字：我是誰',
    titleKo: '자기소개',
    minutes: 10,
    summary: '自我介紹超短版——名字、我、韓國／台灣。',
    points: [
      '저＝禮貌的「我」',
      '입니다＝正式「是」',
      '先背塊，再慢慢拆文法',
    ],
    teach: [
      { ko: '저', zh: '我（禮貌）', roman: 'jeo' },
      { ko: '이름', zh: '名字', roman: 'ireum' },
      { ko: '입니다', zh: '是（正式）', roman: 'imnida' },
      { ko: '한국', zh: '韓國', roman: 'hanguk' },
      { ko: '대만', zh: '台灣', roman: 'daeman' },
    ],
    practice: {
      kind: 'spell',
      prompt: '看中文打韓文。',
      clueZh: '韓國',
      answer: '한국',
      hint: 'han-guk',
    },
    joy: '你可以說：저 ○○입니다。超酷。',
  },
  {
    id: 'vocab-cafe',
    stage: 'vocab',
    order: 7,
    title: '單字：咖啡館生存包',
    titleKo: '카페 단어',
    minutes: 10,
    summary: '點一杯就夠用的詞——生活韓文開始了。',
    points: [
      '주세요＝請給我',
      '아이스＝冰的',
      '先會點，文法之後補',
    ],
    teach: [
      { ko: '주세요', zh: '請給我', roman: 'juseyo' },
      { ko: '커피', zh: '咖啡', roman: 'keopi' },
      { ko: '아이스', zh: '冰的', roman: 'aiseu' },
      { ko: '물', zh: '水', roman: 'mul' },
      { ko: '얼마예요', zh: '多少錢？', roman: 'eolmayeyo' },
    ],
    practice: {
      kind: 'pick',
      prompt: '想說「請給我」，選哪個？',
      options: ['주세요', '안녕하세요', '네', '이름'],
      answer: '주세요',
    },
    joy: '下一杯，試著說：아이스 커피 주세요。',
  },
]

export interface VocabWord {
  id: string
  ko: string
  zh: string
  roman: string
  lessonId?: string
}

export const vocabBank: VocabWord[] = lessons
  .filter((l) => l.stage === 'vocab')
  .flatMap((l) =>
    l.teach.map((t, i) => ({
      id: `${l.id}-${i}`,
      ko: t.ko,
      zh: t.zh,
      roman: t.roman ?? '',
      lessonId: l.id,
    })),
  )

export interface PathDay {
  day: number
  title: string
  tip: string
  lessonIds: string[]
  focus: Stage
}

/** 線性路徑：九音 → 子音 → 拼字 → 單字（對齊德文單字路徑節奏） */
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
  {
    day: 5,
    title: 'Day 5 · 單字：打招呼',
    tip: '正式收單字。閃卡聽完再翻。',
    lessonIds: ['vocab-hello'],
    focus: 'vocab',
  },
  {
    day: 6,
    title: 'Day 6 · 單字：我是誰',
    tip: '自我介紹五個詞，拼一個「韓國」。',
    lessonIds: ['vocab-me'],
    focus: 'vocab',
  },
  {
    day: 7,
    title: 'Day 7 · 單字：咖啡館',
    tip: '生活場景詞。學完可以點一杯。',
    lessonIds: ['vocab-cafe'],
    focus: 'vocab',
  },
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

export function nextIncomplete(completed: string[]) {
  for (const day of pathDays) {
    for (const id of day.lessonIds) {
      if (!completed.includes(id)) return { day, lesson: getLesson(id)! }
    }
  }
  return null
}
