import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export default function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + '/models/car/scene.gltf'
  );

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const group = gltf.scene.children[0].children[0].children[0];
    Array.from({ length: 4 }).forEach((_, i) => {
      group.children[i * 2].rotation.x = t * 2;
    });
  }, []);

  return <primitive object={gltf.scene} />;
}
