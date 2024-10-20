import React, { ReactNode, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

interface RotatorProps {
  children: ReactNode;
  speed?: number;
}

const Rotator = (props: RotatorProps) => {
  const { children, speed = 1 } = props;
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002 * speed;
    }
  });

  return (
    <group ref={groupRef}>{children}</group>
  );
}

export default Rotator;
