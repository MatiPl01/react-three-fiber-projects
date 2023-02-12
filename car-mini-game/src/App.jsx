import { Suspense } from "react";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import "./styles.css";

export default function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Physics boardphase="SAP" gravity={[0, -2.6, 0]}>
          <Scene />
        </Physics>
      </Canvas>

      <div class="controls">
        <p>press w a s d to move</p>
        <p>press c to swap camera</p>
        <p>press r to reset</p>
        <p>press arrows for flips</p>
      </div>
    </Suspense>
  );
}
