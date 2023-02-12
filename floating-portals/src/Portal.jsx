import { useEffect } from "react";
import {
  Scene,
  DoubleSide,
  WebGLRenderTarget,
  TextureLoader,
  LinearEncoding,
  EquirectangularReflectionMapping,
  AlwaysStencilFunc,
  ReplaceStencilOp
} from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import FillQuad from "./FillQuad";

const scene = new Scene();
scene.background = new TextureLoader().load(
  process.env.PUBLIC_URL + "textures/galaxy.jpg",
  (texture) => {
    texture.encoding = LinearEncoding;
    texture.mapping = EquirectangularReflectionMapping;
  }
);

const target = new WebGLRenderTarget(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  target.setSize(window.innerWidth, window.innerHeight);
});

export default function Portal() {
  const model = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/portal.glb"
  );
  const mask = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/portal_mask.glb"
  );

  useEffect(() => {
    if (!model || !mask) return;

    const modelMaterial = model.scene.children[0].material;
    modelMaterial.envMapIntensity = 3.5;

    const maskMaterial = mask.scene.children[0].material;
    maskMaterial.side = DoubleSide;
    maskMaterial.transparent = false;
    maskMaterial.stencilWrite = true;
    maskMaterial.stencilRef = 1;
    maskMaterial.stencilFunc = AlwaysStencilFunc;
    maskMaterial.stencilZPass = ReplaceStencilOp;
  }, [model, mask]);

  useFrame((state) => {
    state.gl.setRenderTarget(target);
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  }, []);

  return (
    <>
      <primitive object={model.scene} />
      <primitive object={mask.scene} />
      <FillQuad map={target.texture} maskId={1} />
    </>
  );
}
