import { Color, DoubleSide, Euler } from 'three'
import { radians } from '../util'
import React from 'react'

interface CircleProps {
  distance?: number
  color?: Color
  rotation?: Euler
  size?: number
};

const Circle = (props: CircleProps) => {
  const {
    distance = 10,
    color = new Color('white'),
    rotation = new Euler(0, radians(0), 0),
    size = 0.25,
  } = props;

  return (
    <mesh position={[0, distance, 0]} rotation={rotation}>
      <circleGeometry attach="geometry" args={[size, 128]} />
      <meshBasicMaterial side={DoubleSide} attach="material" color={color} />
    </mesh>
  );
};

export default Circle;
