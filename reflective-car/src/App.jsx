import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import FloatingGrid from './FloatingGrid';
import Ground from './Ground';
import Boxes from './Boxes';
import Rings from './Rings';
import Car from './Car';
import './styles.css';

function CarShow() {
  const sharedSpotlightProps = {
    angle: 0.6,
    penumbra: 0.5,
    castShadow: true,
    shadowBias: -0.0001
  };

  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color attach="background" args={['#000']} />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <Rings />
      <Boxes />
      <FloatingGrid />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        position={[5, 5, 0]}
        {...sharedSpotlightProps}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        position={[-5, 5, 0]}
        {...sharedSpotlightProps}
      />

      <Ground />

      <EffectComposer>
        <Bloom
          blandFunction={BlendFunction.ADD}
          intensity={1.3}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}
