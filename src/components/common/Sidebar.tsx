import { Bot, Sigma } from 'lucide-react'

import type { AlgorithmMetadata } from '@/types/algorithm'
import { cn } from '@/lib/utils'

interface SidebarProps {
  algorithms: AlgorithmMetadata[]
  selectedId: string
}

export function Sidebar({ algorithms, selectedId }: SidebarProps) {
  return (
    <aside className="w-full border-r border-border bg-card md:w-64">
      <nav className="flex gap-2 overflow-auto p-3 md:flex-col">
        {algorithms.map((algorithm) => {
          const isSelected = algorithm.id === selectedId
          return (
            <a
              key={algorithm.id}
              href={`#/algorithm/${algorithm.id}`}
              className={cn(
                'flex min-w-[180px] items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors md:min-w-0',
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
            >
              {algorithm.category === 'Swarm' ? (
                <Bot className="h-4 w-4" />
              ) : (
                <Sigma className="h-4 w-4" />
              )}
              <span className="truncate">{algorithm.title}</span>
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
