import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Robot } from './model/Robot'
import { Environment, OrbitControls } from '@react-three/drei'

function HeroAnimation() {
  return (
    <div className='h-[100vh] w-[100vw]'>
      <Canvas shadows>
        {/* Add proper lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        {/* Add a Suspense component to handle model loading */}
        <Suspense fallback={null}>
          <Robot scale={[1.5, 1.5, 1.5]} position={[0, 0, 0]} />
          <Environment preset='studio' />
        </Suspense>
        
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  )
}

export default HeroAnimation