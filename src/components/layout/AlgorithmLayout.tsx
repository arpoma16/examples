import 'katex/dist/katex.min.css'

import type { ReactNode } from 'react'
import { BlockMath } from 'react-katex'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AlgorithmLayoutProps {
  title: string
  description: string
  equations: string[]
  canvas: ReactNode
  controls: ReactNode
}

export function AlgorithmLayout({
  title,
  description,
  equations,
  canvas,
  controls,
}: AlgorithmLayoutProps) {
  return (
    <div className="grid h-full gap-4 p-4 lg:grid-cols-[1fr_360px]">
      <Card className="min-h-[420px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="h-[calc(100%-92px)]">{canvas}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Controls & Equations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {controls}
          <div className="space-y-2 border-t border-border pt-4 text-sm">
            {equations.map((equation) => (
              <div key={equation} className="overflow-x-auto">
                <BlockMath math={equation} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
