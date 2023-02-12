import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';

export function Box({ color }) {
  const boxRef = useRef();
  const timeRef = useRef(0);
  const xRotSpeed = useMemo(() => Math.random(), []);
  const yRotSpeed = useMemo(() => Math.random(), []);
  const scale = useMemo(() => Math.random() ** 2 * 0.5 + 0.05, []);
  const [position, setPosition] = useState(new Vector3(0, 0, 0));

  useEffect(() => {
    resetPosition();
  }, []);

  useFrame(
    (_, delta) => {
      timeRef.current += delta * 1.2;
      const z = position.z - timeRef.current;

      if (z < -15) {
        resetPosition();
        timeRef.current = 0;
      }

      boxRef.current.position.set(position.x, position.y, z);
      boxRef.current.rotation.x += xRotSpeed * delta;
      boxRef.current.rotation.y += yRotSpeed * delta;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  function resetPosition() {
    const v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;
    setPosition(v);
  }

  return (
    <mesh ref={boxRef} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
}

export default function Boxes() {
  const arr = useMemo(() => Array.from({ length: 100 }), []);

  return (
    <>
      {arr.map((_, i) => (
        <Box key={i} color={i % 2 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]} />
      ))}
    </>
  );
}
