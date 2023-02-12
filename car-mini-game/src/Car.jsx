import { useEffect, useRef } from "react";
import { Vector3, Quaternion } from "three";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useWheels from "./hooks/useWheels";
import WheelDebug from "./debug/WheelDebug";
import useControls from "./hooks/useControls";

const debug = false;

export default function Car({ thirdPerson }) {
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "models/car.glb");

  const position = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.02;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null)
  );

  useControls(vehicleApi, chassisApi);

  useEffect(() => {
    if (!gltf) return;

    gltf.scene.scale.set(0.0012, 0.0012, 0.0012);
    gltf.scene.children[0].position.set(-365, -18, -67);
  }, [gltf]);

  useFrame((state) => {
    if (!thirdPerson) return;
    const position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    const quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    const forwardDirection = new Vector3(0, 0, -1);
    forwardDirection.applyQuaternion(quaternion);
    forwardDirection.normalize();

    const cameraPosition = position
      .clone()
      .add(
        forwardDirection.clone().multiplyScalar(-1).add(new Vector3(0, 0.3, 0))
      );

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  }, []);

  return (
    <group ref={vehicle} name="vehicle">
      {debug ? (
        <>
          <mesh ref={chassisBody}>
            <boxGeometry args={chassisBodyArgs} />
            <meshBasicMaterial toneMapped={true} opacity={0.5} />
          </mesh>

          <WheelDebug radius={wheelRadius} wheelRef={wheels[0]} />
          <WheelDebug radius={wheelRadius} wheelRef={wheels[1]} />
          <WheelDebug radius={wheelRadius} wheelRef={wheels[2]} />
          <WheelDebug radius={wheelRadius} wheelRef={wheels[3]} />
        </>
      ) : (
        <group ref={chassisBody} name="chassisBody">
          <primitive
            object={gltf.scene}
            rotation-y={Math.PI}
            position={[0, -0.07, 0]}
          />
        </group>
      )}
    </group>
  );
}
