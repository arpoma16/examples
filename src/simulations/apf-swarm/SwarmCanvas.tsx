import { useMemo, useRef } from 'react'

import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SwarmCanvasProps {
  cohesion: number
  showAxes: boolean
}

interface ParticlesProps {
  cohesion: number
}

function Particles({ cohesion }: ParticlesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        radius: 1.5 + (index % 5) * 0.3,
        speed: 0.2 + (index % 7) * 0.05,
        offset: index * 0.3,
      })),
    [],
  )

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime()
    groupRef.current?.children.forEach((child, index) => {
      const particle = particles[index]
      child.position.set(
        Math.cos(elapsed * particle.speed + particle.offset) * particle.radius * cohesion,
        Math.sin(elapsed * particle.speed + particle.offset) * 0.5,
        Math.sin(elapsed * particle.speed + particle.offset) * particle.radius,
      )
    })
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle) => (
        <mesh key={particle.offset}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#3b0764" />
        </mesh>
      ))}
    </group>
  )
}

export function SwarmCanvas({ cohesion, showAxes }: SwarmCanvasProps) {
  return (
    <div className="h-full w-full rounded-md border border-border bg-black">
      <Canvas camera={{ position: [2.6, 2.2, 2.8], fov: 55 }}>
        <color attach="background" args={['#09090b']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={1.5} />
        {showAxes ? <axesHelper args={[1.5]} /> : null}
        <Particles cohesion={cohesion} />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
