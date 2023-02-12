import { useRef } from "react";
import { useTrimesh } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Ramp() {
  const model = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/ramp.glb"
  );

  const geometry = model.scene.children[0].geometry;

  const vertices = geometry.attributes.position.array;
  const indices = geometry.index.array;

  useTrimesh(
    () => ({
      args: [vertices, indices],
      mass: 0,
      type: "Static",
    }),
    useRef(null)
  );
}
