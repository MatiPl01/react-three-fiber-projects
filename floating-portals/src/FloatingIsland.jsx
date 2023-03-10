import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { BufferAttribute } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function FloatingIsland() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/floating_island.glb"
  );

  useEffect(() => {
    if (!gltf) return;

    const mesh = gltf.scene.children[0];
    const uvs = mesh.geometry.attributes.uv.array;

    mesh.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));

    mesh.material.lightMap = mesh.material.map;
    mesh.material.lightMapIntensity = 400;
    mesh.material.color.set([0.04, 0.06, 0.1]);
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
