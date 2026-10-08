import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface KalmanControlsProps {
  noise: number
  running: boolean
  onNoiseChange: (value: number) => void
  onRunningChange: (value: boolean) => void
  onReset: () => void
}

export function KalmanControls({
  noise,
  running,
  onNoiseChange,
  onRunningChange,
  onReset,
}: KalmanControlsProps) {
  return (
    <div className="space-y-4">
      <label className="space-y-2 text-sm">
        <span className="flex items-center justify-between text-muted-foreground">
          Measurement Noise
          <span>{noise.toFixed(1)}</span>
        </span>
        <Slider
          min={0}
          max={2}
          step={0.1}
          value={[noise]}
          onValueChange={(value) => onNoiseChange(value[0] ?? noise)}
        />
      </label>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        Run Simulation
        <Switch checked={running} onCheckedChange={onRunningChange} />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onRunningChange(!running)}>
          {running ? 'Pause' : 'Play'}
        </Button>
        <Button size="sm" variant="outline" onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  )
}
