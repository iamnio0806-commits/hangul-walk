export type PracticeKind = 'match' | 'build' | 'echo' | 'pick'

export interface PracticeItem {
  kind: PracticeKind
  prompt: string
  promptKo?: string
  options?: string[]
  answer: string
  hint?: string
  pairs?: { left: string; right: string }[]
  syllables?: string[]
}

export interface Lesson {
  id: string
  title: string
  titleKo: string
  minutes: number
  mood: string
  story: string
  teach: { ko: string; zh: string; note?: string; roman?: string }[]
  practice: PracticeItem
  joy: string
}

export interface Path {
  id: string
  name: string
  nameKo: string
  blurb: string
  color: string
  accent: string
  lessons: Lesson[]
}

export const paths: Path[] = [
  {
    id: 'hangul',
    name: '字母散步',
    nameKo: '한글 산책',
    blurb: '把韓文字母當成風景——看、聽、拼，不背到崩潰。',
    color: '#3D7A6A',
    accent: '#E8F4F0',
    lessons: [
      {
        id: 'vowels-1',
        title: '十個元音，像呼吸一樣',
        titleKo: '모음 숨쉬기',
        minutes: 8,
        mood: '慢 · 輕 · 開口',
        story:
          '韓文的元音有方向感：ㅏ 像張嘴向右，ㅓ 像往左收。今天只認識聲音，不考試、不計時。',
        teach: [
          { ko: 'ㅏ', zh: '啊（a）', roman: 'a', note: '嘴角微開，像說「啊哈」' },
          { ko: 'ㅓ', zh: '呃（eo）', roman: 'eo', note: '比「喔」更扁一點' },
          { ko: 'ㅗ', zh: '喔（o）', roman: 'o', note: '嘴唇圓圓，像吹氣' },
          { ko: 'ㅜ', zh: '嗚（u）', roman: 'u', note: '嘴巴嘟起' },
          { ko: 'ㅡ', zh: '嗯（eu）', roman: 'eu', note: '嘴扁平，像微笑的線' },
          { ko: 'ㅣ', zh: '衣（i）', roman: 'i', note: '一條豎線，聲音明亮' },
        ],
        practice: {
          kind: 'match',
          prompt: '把聲音和字母輕輕連起來——錯了也沒關係，再點一次就好。',
          pairs: [
            { left: 'ㅏ', right: 'a · 啊' },
            { left: 'ㅗ', right: 'o · 喔' },
            { left: 'ㅣ', right: 'i · 衣' },
            { left: 'ㅜ', right: 'u · 嗚' },
          ],
          answer: 'matched',
        },
        joy: '你剛認識了六個元音。花園裡長出一株小小的「ㅏ」。',
      },
      {
        id: 'consonants-1',
        title: '子音像積木',
        titleKo: '자음 쌓기',
        minutes: 10,
        mood: '玩 · 拼 · 鬆',
        story:
          'ㄱ ㅋ ㄲ 是一家人：普通、送氣、緊音。今天只玩「ㄱ」家族和幾個好朋友。',
        teach: [
          { ko: 'ㄱ', zh: 'g/k', roman: 'g', note: '像槍的準星，輕碰軟顎' },
          { ko: 'ㄴ', zh: 'n', roman: 'n', note: '像跪著的人' },
          { ko: 'ㅁ', zh: 'm', roman: 'm', note: '方方的嘴巴' },
          { ko: 'ㅅ', zh: 's', roman: 's', note: '尖尖的牙齒' },
          { ko: 'ㅇ', zh: '沉默 / ng', roman: 'ng', note: '開頭沒聲音，結尾是 ng' },
          { ko: 'ㅂ', zh: 'b/p', roman: 'b', note: '像桌子' },
        ],
        practice: {
          kind: 'pick',
          prompt: '「媽媽」的開頭音是哪個？',
          promptKo: '엄마의 첫소리',
          options: ['ㅁ', 'ㄱ', 'ㅅ', 'ㅂ'],
          answer: 'ㅁ',
          hint: '엄마 = eom-ma，嘴唇合起來的那個。',
        },
        joy: '積木堆好了。下次可以把子音和元音拼成真正的字。',
      },
      {
        id: 'syllable-1',
        title: '第一個字：나',
        titleKo: '첫 글자',
        minutes: 12,
        mood: '驚喜 · 拼字',
        story:
          '韓文一格一音節：左邊或上面是子音，右邊或下面是元音。나 = ㄴ + ㅏ =「我」。',
        teach: [
          { ko: '나', zh: '我', roman: 'na', note: 'ㄴ + ㅏ' },
          { ko: '너', zh: '你（隨和）', roman: 'neo', note: 'ㄴ + ㅓ' },
          { ko: '고', zh: '且 / 去的詞幹', roman: 'go', note: 'ㄱ + ㅗ' },
          { ko: '미', zh: '美（音譯）', roman: 'mi', note: 'ㅁ + ㅣ' },
          { ko: '수', zh: '水 / 數字的音', roman: 'su', note: 'ㅅ + ㅜ' },
          { ko: '이', zh: '這 / 牙齒', roman: 'i', note: 'ㅇ（無聲）+ ㅣ' },
        ],
        practice: {
          kind: 'build',
          prompt: '拼出「我」——選對積木就好。',
          promptKo: '나',
          syllables: ['ㄴ', 'ㅏ', 'ㅁ', 'ㅓ', 'ㄱ'],
          answer: 'ㄴㅏ',
          hint: '子音在左，元音在右：ㄴ + ㅏ',
        },
        joy: '你寫出了나。從今天起，你可以指著自己說：나。',
      },
    ],
  },
  {
    id: 'daily',
    name: '日常小句',
    nameKo: '하루 한마디',
    blurb: '一句就夠用一天。吃飯、打招呼、說謝謝——生活就會韓文。',
    color: '#C45C4A',
    accent: '#FCEDEB',
    lessons: [
      {
        id: 'hello',
        title: '打招呼的溫度',
        titleKo: '인사 온도',
        minutes: 7,
        mood: '暖 · 禮貌',
        story:
          '안녕하세요是標準問候。對朋友可以说안녕。語氣比背誦重要——微笑著說就對了。',
        teach: [
          { ko: '안녕하세요', zh: '你好（禮貌）', roman: 'annyeonghaseyo', note: '白天Anytime可用' },
          { ko: '안녕', zh: '嗨 / 掰（親）', roman: 'annyeong', note: '朋友之間' },
          { ko: '감사합니다', zh: '謝謝（正式）', roman: 'gamsahamnida' },
          { ko: '고마워', zh: '謝謝（親）', roman: 'gomawo' },
        ],
        practice: {
          kind: 'echo',
          prompt: '跟著念一次，然後選出「正式謝謝」。',
          promptKo: '감사합니다',
          options: ['고마워', '감사합니다', '안녕', '미안'],
          answer: '감사합니다',
        },
        joy: '你有了開門的鑰匙。見人先說안녕하세요，世界會對你笑。',
      },
      {
        id: 'cafe',
        title: '咖啡館一句話',
        titleKo: '카페 한 잔',
        minutes: 9,
        mood: '香 · 日常',
        story: '韓國咖啡館密度超高。學會點一杯，散步就有藉口停下來。',
        teach: [
          { ko: '아이스 아메리카노 주세요', zh: '請給我冰美式', roman: 'aiseu amerikano juseyo' },
          { ko: '따뜻하게 해주세요', zh: '請做成熱的', roman: 'ttatteuthage haejuseyo' },
          { ko: '얼마예요?', zh: '多少錢？', roman: 'eolmayeyo' },
          { ko: '여기서 먹을게요', zh: '我在這裡喝', roman: 'yeogiseo meogeulgeyo' },
        ],
        practice: {
          kind: 'pick',
          prompt: '你想要冰美式，該說哪句？',
          options: [
            '아이스 아메리카노 주세요',
            '얼마예요?',
            '안녕하세요',
            '고마워',
          ],
          answer: '아이스 아메리카노 주세요',
        },
        joy: '下一杯咖啡，可以試著用韓文點。店員聽得懂就夠了。',
      },
      {
        id: 'feelings',
        title: '開心也要說出來',
        titleKo: '기쁜 마음',
        minutes: 8,
        mood: '快樂 · 表達',
        story: '這堂系不考試，但鼓勵你說「我開心」。語言是為了感覺，不是分數。',
        teach: [
          { ko: '좋아요', zh: '喜歡 / 很好', roman: 'joayo' },
          { ko: '행복해요', zh: '我很幸福', roman: 'haengbokhaeyo' },
          { ko: '재밌어요', zh: '很好玩', roman: 'jaemisseoyo' },
          { ko: '사랑해요', zh: '我愛你 / 我愛這個', roman: 'saranghaeyo', note: '對人、對事物都能用得溫柔' },
        ],
        practice: {
          kind: 'match',
          prompt: '把心情對上句子。',
          pairs: [
            { left: '좋아요', right: '喜歡 / 很好' },
            { left: '행복해요', right: '我很幸福' },
            { left: '재밌어요', right: '很好玩' },
            { left: '사랑해요', right: '我愛……' },
          ],
          answer: 'matched',
        },
        joy: '今天學完，對自己說一次：행복해요。這就是這堂課的全部成績。',
      },
    ],
  },
  {
    id: 'lit',
    name: '文學小徑',
    nameKo: '문학 오솔길',
    blurb: '短詩、歌詞、一句小說——韓文學系的浪漫，不用寫報告。',
    color: '#2C4A6E',
    accent: '#EAF0F7',
    lessons: [
      {
        id: 'spring-poem',
        title: '春日一行詩',
        titleKo: '봄 한 줄',
        minutes: 10,
        mood: '詩 · 慢讀',
        story:
          '尹東柱《序詩》開頭：「죽는 날까지 하늘을 우러러…」我們只取溫柔的意象，慢慢讀音與意思。',
        teach: [
          { ko: '하늘', zh: '天空', roman: 'haneul' },
          { ko: '바람', zh: '風', roman: 'baram' },
          { ko: '별', zh: '星星', roman: 'byeol' },
          { ko: '봄', zh: '春天', roman: 'bom' },
          { ko: '마음', zh: '心', roman: 'maeum' },
        ],
        practice: {
          kind: 'pick',
          prompt: '「星星」用韓文怎麼說？',
          options: ['별', '바람', '하늘', '봄'],
          answer: '별',
        },
        joy: '你口袋裡多了五個詩的詞。晚上看天，可以想：별。',
      },
      {
        id: 'song-line',
        title: '歌詞當課本',
        titleKo: '가사 교과서',
        minutes: 8,
        mood: '聽 · 跟唱',
        story: 'K-pop 是合法外掛。選一句反覆聽，比單字卡記得更牢，而且比較開心。',
        teach: [
          { ko: '너를 사랑해', zh: '我愛你', roman: 'neoreul saranghae' },
          { ko: '오늘 밤', zh: '今晚', roman: 'oneul bam' },
          { ko: '함께', zh: '一起', roman: 'hamkke' },
          { ko: '춤추자', zh: '一起跳舞吧', roman: 'chumchuja' },
        ],
        practice: {
          kind: 'echo',
          prompt: '選出「一起」的韓文。',
          promptKo: '함께',
          options: ['오늘 밤', '함께', '춤추자', '하늘'],
          answer: '함께',
        },
        joy: '下次聽歌，抓住一個詞就暫停——那是你的私人課堂。',
      },
      {
        id: 'novel-sip',
        title: '小說一口',
        titleKo: '소설 한 모금',
        minutes: 11,
        mood: '故事 · 沉浸',
        story:
          '韓文學系不必一次讀完一本。今天只品一小段：人物怎麼問好、怎麼告別。',
        teach: [
          { ko: '그는 웃었다', zh: '他笑了', roman: 'geuneun useotda' },
          { ko: '문이 열렸다', zh: '門開了', roman: 'muni yeollyeotda' },
          { ko: '밤이 깊었다', zh: '夜深了', roman: 'bami gipeotda' },
          { ko: '그래도 괜찮다', zh: '即使如此也沒關係', roman: 'geuraedo gwaenchanta' },
        ],
        practice: {
          kind: 'match',
          prompt: '把句子與意思配對。',
          pairs: [
            { left: '그는 웃었다', right: '他笑了' },
            { left: '문이 열렸다', right: '門開了' },
            { left: '밤이 깊었다', right: '夜深了' },
            { left: '그래도 괜찮다', right: '也沒關係' },
          ],
          answer: 'matched',
        },
        joy: '韓文學系的精神：讀一行就夠美。明天還可以再讀一行。',
      },
    ],
  },
]

export const manifesto = [
  '沒有考試',
  '沒有倒數計時',
  '錯了可以重來',
  '進度是花園，不是分數',
  '一天一句，也算優秀',
]

export function getLesson(pathId: string, lessonId: string) {
  const path = paths.find((p) => p.id === pathId)
  const lesson = path?.lessons.find((l) => l.id === lessonId)
  return { path, lesson }
}

export function totalLessons() {
  return paths.reduce((n, p) => n + p.lessons.length, 0)
}
