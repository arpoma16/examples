import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface SwarmControlsProps {
  cohesion: number
  showAxes: boolean
  onCohesionChange: (value: number) => void
  onShowAxesChange: (value: boolean) => void
  onReset: () => void
}

export function SwarmControls({
  cohesion,
  showAxes,
  onCohesionChange,
  onShowAxesChange,
  onReset,
}: SwarmControlsProps) {
  return (
    <div className="space-y-4">
      <label className="space-y-2 text-sm">
        <span className="flex items-center justify-between text-muted-foreground">
          Cohesion
          <span>{cohesion.toFixed(1)}</span>
        </span>
        <Slider
          min={0.1}
          max={2}
          step={0.1}
          value={[cohesion]}
          onValueChange={(value) => onCohesionChange(value[0] ?? cohesion)}
        />
      </label>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        Show Axes
        <Switch checked={showAxes} onCheckedChange={onShowAxesChange} />
      </div>
      <Button size="sm" variant="outline" onClick={onReset}>
        Reset Camera
      </Button>
    </div>
  )
}
