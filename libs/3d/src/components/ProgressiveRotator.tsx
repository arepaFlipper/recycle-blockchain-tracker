import * as THREE from 'three'
import React, { ReactNode } from 'react'
import { radians } from '../util'

interface ProgressiveRotatorProps {
  initialRotation: number
  endRotation: number
  progress: number
  children: ReactNode

  position?: THREE.Vector3
  scale?: THREE.Vector3
}

const ProgressiveRotator = (props: ProgressiveRotatorProps) => {
  const {
    initialRotation,
    endRotation,
    progress,
    children,
    position = new THREE.Vector3(0, 0, 0),
    scale = new THREE.Vector3(1, 1, 1),
  } = props;
  const rotation = new THREE.Euler().setFromVector3(
    new THREE.Vector3().lerpVectors(
      new THREE.Vector3(initialRotation, radians(90), 0),
      new THREE.Vector3(endRotation, radians(90), 0),
      progress,
    ),
  )

  return (
    <group rotation={rotation} position={position} scale={scale}>
      {children}
    </group>
  )
}

export default ProgressiveRotator;
