import React, { ReactNode, useRef, useState } from 'react'
import * as THREE from 'three';
import { SpawnedItem } from '../util/types';
import { useFrame } from '@react-three/fiber';
import ProgressiveRotator from './ProgressiveRotator';

type ISpawnerProps = {
  spawnInterval: number;
  initialRotation: number;
  endRotation: number;
  duration: number;
  position?: THREE.Vector3;
  initialDelay?: number;
  children?: ReactNode;
}

const Spawner = (props: ISpawnerProps) => {
  const { initialDelay = 0, spawnInterval, initialRotation, endRotation, duration, position, children } = props;
  const [items, setItems] = useState<Array<SpawnedItem>>([]);
  const last_spawn_time = useRef(Date.now() + initialDelay * 1000);

  useFrame((_, delta) => {
    if (Date.now() - last_spawn_time.current >= spawnInterval * 1000) {
      const id = Date.now();
      last_spawn_time.current = id;
      setItems((prevItems) => [...prevItems, { id, progress: 0 }]);
    }

    setItems((prevItems: Array<SpawnedItem>) => {
      return prevItems.map((item) => {
        const progress = item.progress + delta / duration;

        if (progress >= 1) {
          return null;
        }

        return { ...item, progress }
      })
        .filter((item): item is SpawnedItem => item !== null)
    })

  });
  return (
    <>
      {items.map(({ id, progress }: SpawnedItem) => {
        return (
          <ProgressiveRotator
            key={id} position={position}
            initialRotation={initialRotation}
            endRotation={endRotation}
            progress={progress}
          >
            {children}
          </ProgressiveRotator>
        )
      })}
    </>
  )
}

export default Spawner
