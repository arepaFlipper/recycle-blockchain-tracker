"use client"
import { BaseComponent } from '@recycle-chain/util/src/types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React from 'react';
import { Globe } from '../components/Globe';
import { radians } from '../util';
import { Rotator } from '../components/Rotator';

export const SustainabilityScene = ({ children, className = "" }: BaseComponent) => {
  return (
    <Canvas
      style={{
        zIndex: 0,
        height: `calc(100vh - 4rem)`,
        background: 'linear-gradient(to top right, hsl(10,15%, 10%), hsl(10,3%, 5%)',
      }}
    >
      <Rotator speed={1.5}>
        <Globe />
      </Rotator>
      <OrbitControls
        minPolarAngle={radians(0)}
        maxPolarAngle={radians(180)}
        minDistance={60}
        maxDistance={600}
      />
    </Canvas>
  )

}
