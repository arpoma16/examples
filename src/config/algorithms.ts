import type { AlgorithmMetadata } from '@/types/algorithm'

export const algorithms: AlgorithmMetadata[] = [
  {
    id: 'kalman-1d',
    title: 'Kalman Filter (1D)',
    category: 'Estimation',
    description: '1D noisy signal filtering with prediction and correction steps.',
    equations: [
      'x_{k|k-1}=A x_{k-1|k-1}+B u_k',
      'K_k = P_{k|k-1} H^T (H P_{k|k-1} H^T + R)^{-1}',
    ],
    controls: [
      { id: 'noise', label: 'Measurement Noise', type: 'slider', min: 0, max: 2, step: 0.1, defaultValue: 0.6 },
      { id: 'playing', label: 'Run Simulation', type: 'switch', defaultValue: true },
    ],
  },
  {
    id: 'apf-swarm',
    title: 'Potential Field Swarm',
    category: 'Swarm',
    description: '3D swarm particles reacting to attraction and obstacle repulsion.',
    equations: ['F = -\nabla U(x)', 'U(x) = U_{att}(x)+U_{rep}(x)'],
    controls: [
      { id: 'cohesion', label: 'Cohesion', type: 'slider', min: 0.1, max: 2, step: 0.1, defaultValue: 1 },
      { id: 'showAxes', label: 'Show Axes', type: 'switch', defaultValue: true },
    ],
  },
]
