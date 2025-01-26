import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useContext, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RotationContext, DarkmodeContext } from "../App";
import { useHelper } from "@react-three/drei";

function BluePantsMan() {
  const spotLight = useRef();
  useHelper(spotLight, THREE.SpotLightHelper, 'white' );

  const azimuthalAngle = useContext(RotationContext);
  const { darkMode } = useContext(DarkmodeContext);
  const prevAzimuthalAngle = useRef(azimuthalAngle);
  const modelRef = useRef();
  const targetRef = useRef();

  const bluePantsModel = useLoader(FBXLoader, "/BluePantsMan.fbx");
  bluePantsModel.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.transparent = false;
        child.material.opacity = 1.0;
      }
    }
  });

  const mixer = useRef();
  const animationAction = useRef();
  useEffect(() => {
    if (bluePantsModel.animations && bluePantsModel.animations.length) {
      mixer.current = new THREE.AnimationMixer(bluePantsModel);
      animationAction.current = mixer.current.clipAction(bluePantsModel.animations[0]);
      animationAction.current.play();
    }
  }, [bluePantsModel]);

  const radius = 42.5;
  const angleRef = useRef(4.725);
  const positionRef = useRef(new THREE.Vector3(0, 0, 0));
  const smoothingFactor = 0.1;

  useFrame((_, delta) => {
    if (mixer.current && animationAction.current) {
      const rotationDelta = azimuthalAngle - prevAzimuthalAngle.current;
      angleRef.current -= rotationDelta;

      const targetPosition = new THREE.Vector3(
        radius * -Math.cos(angleRef.current),
        0,
        radius * -Math.sin(angleRef.current)
      );
      positionRef.current.lerp(targetPosition, smoothingFactor);

      if (modelRef.current) {
        modelRef.current.position.copy(positionRef.current);
        modelRef.current.rotation.y = -angleRef.current;

        const speed = THREE.MathUtils.clamp(rotationDelta * 100, -10, 10);
        animationAction.current.setEffectiveTimeScale(Math.abs(speed) / 2);
      }

      mixer.current.update(delta);
      prevAzimuthalAngle.current = azimuthalAngle;
    }

    if (targetRef.current && modelRef.current) {
      targetRef.current.position.copy(modelRef.current.position); // Update target position
      targetRef.current.updateMatrixWorld(); // Ensure it is updated in the scene
    }
  });

  return (
    <>
      <primitive
        ref={modelRef}
        object={bluePantsModel}
        position={[0, 0, 42.5]}
        scale={[4, 4, 4]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        castShadow
      />

      {darkMode && (
        <>
          {/* Spotlight */}
          <spotLight
            ref={spotLight}
            color={0xffffff}
            intensity={5000}
            angle={Math.PI / 30}
            position={[0, 50, 0]}
            penumbra={0.5}
            target={targetRef.current} 
            castShadow
          />
          {/* Invisible Target */}
          <object3D ref={targetRef} />
        </>
      )}
    </>
  );
}

export default BluePantsMan;


