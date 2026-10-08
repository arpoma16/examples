import { useState } from 'react'

import { AlgorithmLayout } from '@/components/layout/AlgorithmLayout'
import { algorithms } from '@/config/algorithms'

import { SwarmCanvas } from './SwarmCanvas'
import { SwarmControls } from './SwarmControls'

const metadata = algorithms.find((algorithm) => algorithm.id === 'apf-swarm')

export default function SwarmSimulation() {
  const [cohesion, setCohesion] = useState(1)
  const [showAxes, setShowAxes] = useState(true)
  const [resetSeed, setResetSeed] = useState(0)

  if (!metadata) {
    return null
  }

  return (
    <AlgorithmLayout
      title={metadata.title}
      description={metadata.description}
      equations={metadata.equations}
      canvas={<SwarmCanvas key={resetSeed} cohesion={cohesion} showAxes={showAxes} />}
      controls={
        <SwarmControls
          cohesion={cohesion}
          showAxes={showAxes}
          onCohesionChange={setCohesion}
          onShowAxesChange={setShowAxes}
          onReset={() => setResetSeed((value) => value + 1)}
        />
      }
    />
  )
}
