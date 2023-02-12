import { useEffect } from 'react';
import { RepeatWrapping, TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';

export default function FloatingGrid() {
  const diffuse = useLoader(TextureLoader, process.env.PUBLIC_URL + '/textures/grid-texture.png');

  useEffect(() => {
    diffuse.wrapS = diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30);
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  useFrame((state) => {
    diffuse.offset.y = -state.clock.getElapsedTime() * 0.68;
  }, []);

  return (
    <>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[35, 35]} />
        <meshBasicMaterial
          map={diffuse}
          alphaMap={diffuse}
          color={[1, 1, 1]}
          opacity={0.15}
          transparent
        />
      </mesh>
    </>
  );
}
