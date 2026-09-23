import { useCallback, useEffect, useState } from 'react'
import { totalLessons } from '../data/curriculum'

const KEY = 'hangul-walk-progress-v2'

export interface ProgressState {
  completed: string[]
  blooms: number
  lastVisit: string | null
  name: string
  daysDone: number[]
}

const defaultState: ProgressState = {
  completed: [],
  blooms: 0,
  lastVisit: null,
  name: '',
  daysDone: [],
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(defaultState)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setState(load())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state, ready])

  const isDone = useCallback(
    (lessonId: string) => state.completed.includes(lessonId),
    [state.completed],
  )

  const complete = useCallback((lessonId: string) => {
    setState((prev) => {
      if (prev.completed.includes(lessonId)) return prev
      return {
        ...prev,
        completed: [...prev.completed, lessonId],
        blooms: prev.blooms + 1,
        lastVisit: new Date().toISOString(),
      }
    })
  }, [])

  const markDay = useCallback((day: number) => {
    setState((prev) => {
      if (prev.daysDone.includes(day)) return prev
      return { ...prev, daysDone: [...prev.daysDone, day] }
    })
  }, [])

  const setName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, name }))
  }, [])

  const reset = useCallback(() => {
    setState(defaultState)
  }, [])

  const ratio = state.completed.length / Math.max(totalLessons(), 1)

  return { state, ready, isDone, complete, markDay, setName, reset, ratio }
}
