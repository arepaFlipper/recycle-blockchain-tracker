'use client'
import React from 'react'
import { Sphere } from "@react-three/drei"
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

export const Globe = () => {
  const texture = useLoader(TextureLoader, '/textures/earth_8k.jpeg')
  return (
    <Sphere args={[160, 16, 16]} position={[0, -170, 0]}>
      <meshBasicMaterial map={texture} />
    </Sphere>
  )
}
