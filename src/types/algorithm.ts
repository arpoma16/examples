export interface ControlConfig {
  id: string
  label: string
  type: 'slider' | 'switch' | 'select'
  min?: number
  max?: number
  step?: number
  defaultValue: number | boolean | string
}

export interface AlgorithmMetadata {
  id: string
  title: string
  category: 'Robotics' | 'Estimation' | 'Swarm' | 'Control'
  description: string
  equations: string[]
  controls: ControlConfig[]
}
