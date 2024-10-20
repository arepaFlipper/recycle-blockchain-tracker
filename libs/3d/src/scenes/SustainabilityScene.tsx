"use client"
import { BaseComponent } from '@recycle-chain/util/src/types';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React from 'react';
import { Globe } from '../components/Globe';
import { radians } from '../util';
import { Rotator } from '../components/Rotator';
import { Color, Euler, Vector3 } from 'three';
import Spawner from '../components/Spawner';
import Circle from '../components/Circle';
import { DURATION, SPAWN_INTERVAL, extractor } from '../util/constants';

const SustainabilityScene = ({ children, className = "" }: BaseComponent) => {
  return (
    <Canvas
      style={{
        zIndex: 0,
        height: `calc(100vh - 4rem)`,
        background: 'linear-gradient(to top right, hsl(10, 15%, 10%), hsl(10, 3%, 5%))',
      }}
    >

      <PerspectiveCamera
        makeDefault
        fov={20}
        near={0.1}
        far={1000}
        position={[400, -50, 0]}
        rotation={[radians(0), radians(90), 0]}
      />
      <OrbitControls
        minPolarAngle={radians(0)}
        maxPolarAngle={radians(120)}
        minDistance={60}
        maxDistance={800}
      />
      <Rotator>
        <Globe />
        <group rotation={new Euler(radians(0), radians(-90), radians(90))}>
          <Spawner
            spawnInterval={SPAWN_INTERVAL * 1.25}
            duration={DURATION * 1.5}
            initialRotation={radians(241)}
            endRotation={radians(-120)}
            initialDelay={DURATION / 4}
          >
            <Circle distance={11} />
          </Spawner>
          <Spawner
            spawnInterval={SPAWN_INTERVAL * 1.25}
            duration={DURATION * 1.25}
            initialRotation={radians(361)}
            endRotation={radians(0)}
            initialDelay={DURATION / 4}
          >
            <Circle distance={10} />
          </Spawner>
          <Spawner
            spawnInterval={SPAWN_INTERVAL * 1.25}
            duration={DURATION * 1}
            initialRotation={radians(121)}
            endRotation={radians(-240)}
            initialDelay={DURATION / 4}
          >
            <Circle distance={9} />
          </Spawner>

          {extractor.map(({ position, rotationAngle, initialDelay }) => {

            return (
              <group key={rotationAngle} position={position}
                rotation={new Euler(0, radians(90), radians(rotationAngle))}
              >
                <Spawner
                  initialDelay={initialDelay}
                  spawnInterval={SPAWN_INTERVAL}
                  initialRotation={radians(0)}
                  endRotation={radians(90)}
                  duration={DURATION / 4}
                  position={new Vector3(0, 0, 0)}
                >
                  <Circle color={new Color('white')} rotation={new Euler(radians(-90), 0, 0)} distance={10} />
                </Spawner>
              </group>
            )
          })}

        </group>
      </Rotator>
    </Canvas>
  )

}

export default SustainabilityScene;
