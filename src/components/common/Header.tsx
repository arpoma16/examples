import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface HeaderProps {
  isDark: boolean
  onToggleTheme: () => void
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
      <div>
        <p className="text-sm text-muted-foreground">Interactive Algorithm Platform</p>
        <h1 className="text-xl font-semibold text-foreground">Robotics & Math Visualizations</h1>
      </div>
      <Button variant="outline" size="sm" onClick={onToggleTheme}>
        {isDark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
        {isDark ? 'Light' : 'Dark'}
      </Button>
    </header>
  )
}
