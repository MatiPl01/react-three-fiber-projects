import { useState, useEffect } from "react";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import Ground from "./Ground";
import Track from "./Track";
import Car from "./Car";

export default function Scene() {
  const [thirdPerson, setThirdPerson] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "c") return;
      if (thirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * .01]);
      setThirdPerson(!thirdPerson);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [thirdPerson]);

  return (
    <>
      <Environment
        files={process.env.PUBLIC_URL + "textures/envmap.hdr"}
        background="both"
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {thirdPerson ? null : <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Ground />
      <Track />
      <Car thirdPerson={thirdPerson} />
    </>
  );
}
