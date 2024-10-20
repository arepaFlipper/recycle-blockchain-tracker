'use client'
import React, { useRef, useState } from 'react'
import { Sphere } from "@react-three/drei"
import { useFrame, useLoader } from '@react-three/fiber'
import { Mesh, MeshBasicMaterial, TextureLoader } from 'three'
import { radians } from '../util';

export const Globe = () => {
  const texture = useLoader(TextureLoader, '/textures/earth_8k.jpeg')
  const globeRef = useRef<Mesh>(null)
  const overlayRef = useRef<Mesh>(null)
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }

    if (overlayRef.current) {
      setOpacity((prev) => Math.min(0.6, prev + 0.003));
      const material = overlayRef.current.material as MeshBasicMaterial;
      material.opacity = opacity;
    }
  })
  return (
    <>
      <Sphere
        args={[160, 16, 16]}
        position={[0, -170, 0]}
        rotation={[radians(60), 0, radians(30)]}
      >
        <meshBasicMaterial map={texture} />
      </Sphere>
      <Sphere
        ref={overlayRef}
        args={[161, 64, 64]}
        position={[0, -170, 0]}
      >
        <meshBasicMaterial color="darkred" transparent={true} opacity={opacity} />
      </Sphere>
    </>
  )
}
