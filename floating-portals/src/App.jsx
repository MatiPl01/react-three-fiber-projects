import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SceneContainer from "./SceneContainer";
import "./styles.css";

export default function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <SceneContainer />
      </Canvas>
    </Suspense>
  );
}
