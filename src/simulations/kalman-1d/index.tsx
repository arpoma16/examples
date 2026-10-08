import { useState } from 'react'

import { AlgorithmLayout } from '@/components/layout/AlgorithmLayout'
import { algorithms } from '@/config/algorithms'

import { KalmanCanvas } from './KalmanCanvas'
import { KalmanControls } from './KalmanControls'

const metadata = algorithms.find((algorithm) => algorithm.id === 'kalman-1d')

export default function KalmanSimulation() {
  const [noise, setNoise] = useState(0.6)
  const [running, setRunning] = useState(true)
  const [resetSeed, setResetSeed] = useState(0)

  if (!metadata) {
    return null
  }

  return (
    <AlgorithmLayout
      title={metadata.title}
      description={metadata.description}
      equations={metadata.equations}
      canvas={<KalmanCanvas key={resetSeed} noise={noise} running={running} />}
      controls={
        <KalmanControls
          noise={noise}
          running={running}
          onNoiseChange={setNoise}
          onRunningChange={setRunning}
          onReset={() => setResetSeed((value) => value + 1)}
        />
      }
    />
  )
}
