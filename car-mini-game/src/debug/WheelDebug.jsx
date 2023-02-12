const debug = true;

export default function WheelDebug({ radius, wheelRef }) {
  return debug ? (
    <group ref={wheelRef}>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, 0.015, 16]} />
        <meshBasicMaterial transparent={true} opacity={0.25} />
      </mesh>
    </group>
  ) : null;
}
