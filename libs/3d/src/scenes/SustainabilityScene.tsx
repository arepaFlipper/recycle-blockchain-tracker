"use client"
import { BaseComponent } from '@recycle-chain/util/src/types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React from 'react';
import { Globe } from '../components/Globe';
import { radians } from '../util';
import { Rotator } from '../components/Rotator';
import { Euler } from 'three';
import Spawner from '../components/Spawner';
import Circle from '../components/Circle';
import { DURATION, SPAWN_INTERVAL } from '../util/constants';

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
        <group rotation={new Euler(radians(0), radians(-90), radians(90))}></group>
        <Spawner
          spawnInterval={SPAWN_INTERVAL * 1.25}
          duration={DURATION * 1.5}
          initialRotation={radians(240)}
          endRotation={radians(-120)}
          initialDelay={DURATION / 4}
        >
          <Circle distance={11} />
        </Spawner>
      </Rotator>
      <OrbitControls
        minPolarAngle={radians(0)}
        maxPolarAngle={radians(180)}
        minDistance={60}
        maxDistance={600}
      />
    </Canvas >
  )

}
