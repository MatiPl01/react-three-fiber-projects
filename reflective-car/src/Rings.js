import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Color } from 'three';

export default function Rings() {
  const itemsRef = useRef([]);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    itemsRef.current.forEach((mesh, i) => {
      mesh.position.z = (i - 7) * 3.5 - ((elapsedTime * .4) % 3.5) * 2;

      const dist = Math.abs(mesh.position.z);
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

      const colorScale = .5 * (dist > 2 ? (1 - (Math.min(dist, 12) - 2) / 10) : 1);

      if (i % 2) {
        mesh.material.emissive = new Color(6, .15, .7).multiplyScalar(colorScale);
      } else {
        mesh.material.emissive = new Color(.1, .7, 3).multiplyScalar(colorScale);
      }
    });
  }, []);

  return (
    <>
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color="white" />
        </mesh>
      ))}
    </>
  );
}
