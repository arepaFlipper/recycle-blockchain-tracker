"use client"
import { useFrame } from '@react-three/fiber'
import React, { ReactNode, useRef } from 'react'
import { Group } from 'three'

type RotatorProps = {
  children: ReactNode
  speed?: number
}
export const Rotator = ({ children, speed = 1 }: RotatorProps): JSX.Element => {
  const groupRef = useRef<Group>(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += .002 * speed;
    }
  })
  return (
    <group ref={groupRef}>{children}</group>
  )

}
