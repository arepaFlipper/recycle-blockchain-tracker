import React, { ReactNode } from "react";
import * as THREE from "three";
import { radians } from '../util';

interface ProgressiveRotatorProps {
  children: ReactNode;
  initialRotation: number;
  endRotation: number;
  progress: number;
  position?: THREE.Vector3;
  scale?: THREE.Vector3;
}

const ProgressiveRotator = (props: ProgressiveRotatorProps) => {
  const { initialRotation, endRotation, progress, position, scale, children } = props;
  const [vector1, vector2] = [
    new THREE.Vector3(initialRotation, radians(90), 0),
    new THREE.Vector3(endRotation, radians(90), 0),
  ];
  const current_position = new THREE.Vector3().lerpVectors(vector1, vector2, progress);

  const current_rotation = new THREE.Euler().setFromVector3(current_position);
  return (
    <group
      position={position}
      rotation={current_rotation}
      scale={scale}
    >
      {children}
    </group>
  )
}

export default ProgressiveRotator;
