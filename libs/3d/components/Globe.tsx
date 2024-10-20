'use client'
import React from 'react'
import { Sphere } from "@react-three/drei"

export const Globe = () => {
  return (
    <Sphere args={[1, 32, 32]} />
  )
}
