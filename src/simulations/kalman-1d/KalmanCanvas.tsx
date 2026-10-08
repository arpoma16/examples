import { useMemo, useRef } from 'react'

import { useAnimationFrame } from '@/hooks/useAnimationFrame'

interface KalmanCanvasProps {
  noise: number
  running: boolean
}

export function KalmanCanvas({ noise, running }: KalmanCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointRef = useRef({ x: 0, v: 0.4, estimate: 0 })
  const trailRef = useRef<number[]>([])

  useAnimationFrame((deltaTime) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    if (running) {
      pointRef.current.x += pointRef.current.v * deltaTime * 140
      if (pointRef.current.x > canvas.width || pointRef.current.x < 0) {
        pointRef.current.v *= -1
      }

      const measured = pointRef.current.x + (Math.random() - 0.5) * noise * 40
      pointRef.current.estimate += (measured - pointRef.current.estimate) * 0.08
      trailRef.current.push(pointRef.current.estimate)
      if (trailRef.current.length > 120) {
        trailRef.current.shift()
      }
    }

    context.fillStyle = '#09090b'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.strokeStyle = '#8b5cf6'
    context.lineWidth = 2
    context.beginPath()
    trailRef.current.forEach((value, index) => {
      const x = (index / 119) * canvas.width
      const y = canvas.height / 2 + (value - canvas.width / 2) * 0.5
      if (index === 0) {
        context.moveTo(x, y)
      } else {
        context.lineTo(x, y)
      }
    })
    context.stroke()

    context.fillStyle = '#22d3ee'
    context.beginPath()
    context.arc(pointRef.current.x, canvas.height / 2, 8, 0, Math.PI * 2)
    context.fill()
  }, true)

  const size = useMemo(() => ({ width: 760, height: 380 }), [])

  return (
    <canvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
      className="h-full w-full rounded-md border border-border bg-black"
    />
  )
}
