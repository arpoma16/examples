import { useEffect, useRef } from 'react'

export function useAnimationFrame(callback: (deltaTime: number) => void, enabled = true) {
  const callbackRef = useRef(callback)
  const frameRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number | undefined>(undefined)
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const animate = (time: number) => {
      const lastTime = lastTimeRef.current ?? time
      const deltaTime = (time - lastTime) / 1000
      lastTimeRef.current = time
      callbackRef.current(deltaTime)
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      lastTimeRef.current = undefined
    }
  }, [enabled])
}
