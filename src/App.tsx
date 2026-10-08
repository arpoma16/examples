import { lazy, Suspense, useEffect, useMemo, useState } from 'react'

import { Header } from '@/components/common/Header'
import { LoadingFallback } from '@/components/common/LoadingFallback'
import { Sidebar } from '@/components/common/Sidebar'
import { algorithms } from '@/config/algorithms'

const simulationComponents = {
  'kalman-1d': lazy(() => import('@/simulations/kalman-1d')),
  'apf-swarm': lazy(() => import('@/simulations/apf-swarm')),
} as const

type SimulationId = keyof typeof simulationComponents

function getSimulationIdFromHash(hash: string): SimulationId {
  const match = hash.match(/^#\/algorithm\/([\w-]+)/)
  const fallback = algorithms[0].id as SimulationId

  if (!match) {
    return fallback
  }

  const simulationId = match[1] as SimulationId
  return simulationId in simulationComponents ? simulationId : fallback
}

function ensureDefaultHash() {
  if (!window.location.hash) {
    window.location.hash = `#/algorithm/${algorithms[0].id}`
  }
}

function App() {
  const [selectedId, setSelectedId] = useState<SimulationId>(() =>
    getSimulationIdFromHash(window.location.hash),
  )
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark'),
  )

  useEffect(() => {
    ensureDefaultHash()

    const onHashChange = () => {
      setSelectedId(getSimulationIdFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const ActiveSimulation = useMemo(
    () => simulationComponents[selectedId] ?? simulationComponents['kalman-1d'],
    [selectedId],
  )

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header
        isDark={isDark}
        onToggleTheme={() => {
          const nextIsDark = !isDark
          setIsDark(nextIsDark)
          document.documentElement.classList.toggle('dark', nextIsDark)
        }}
      />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar algorithms={algorithms} selectedId={selectedId} />
        <main className="flex-1">
          <Suspense fallback={<LoadingFallback />}>
            <ActiveSimulation />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

export default App
