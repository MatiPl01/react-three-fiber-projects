import { MeshReflectorMaterial } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { TextureLoader, RepeatWrapping, LinearEncoding } from 'three';

export default function Ground() {
  const [roughness, normal] = useLoader(TextureLoader, [
    process.env.PUBLIC_URL + '/textures/terrain-roughness.jpg',
    process.env.PUBLIC_URL + '/textures/terrain-normal.jpg'
  ]);

  useEffect(() => {
    [normal, roughness].forEach((t) => {
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(5, 5);
    });

    normal.encoding = LinearEncoding;
  }, [roughness, normal]);

  useFrame((state) => {
    const offset = -state.clock.getElapsedTime() * 0.128
    normal.offset.y = offset;
    roughness.offset.y = offset;
  }, []);

  return (
    <mesh rotation-x={-Math.PI / 2} castShadow receiveShadow>
      <planeBufferGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.15, 0.15]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        maxBlur={30}
        maxStrength={80}
        minContrast={1}
        resolution={1024}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        debug={0}
        reflectorOffset={0.2}
      />
    </mesh>
  );
}
