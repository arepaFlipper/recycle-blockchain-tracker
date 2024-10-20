"use client"
import { BaseComponent } from '@recycle-chain/util/src/types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React from 'react';
import { Globe } from '../components/Globe';

export const SustainabilityScene = ({ children, className = "" }: BaseComponent) => {
  return (
    <Canvas
      style={{
        zIndex: 0,
        height: `calc(100vh - 4rem)`,
        background: 'linear-gradient(to top right, hsl(10,15%, 10%), hsl(10,3%, 5%)',
      }}
    >
      <Globe />
      <OrbitControls />
    </Canvas>
  )

}
