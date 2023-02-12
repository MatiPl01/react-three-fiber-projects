import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { Color, DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Grass() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/grass.glb"
  );

  useEffect(() => {
    if (!gltf) return;

    const material = gltf.scene.children[0].material;
    material.map = material.emissiveMap;
    material.emissive = new Color(0.5, 0.5, 0.5);
    material.side = DoubleSide;
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
