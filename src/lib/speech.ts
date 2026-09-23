export function speakKo(text: string, rate = 0.85) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ko-KR'
  u.rate = rate
  const voices = window.speechSynthesis.getVoices()
  const ko = voices.find((v) => v.lang.startsWith('ko'))
  if (ko) u.voice = ko
  window.speechSynthesis.speak(u)
}
