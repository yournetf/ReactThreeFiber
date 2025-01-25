import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useContext, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RotationContext } from "../App";

function BluePantsMan() {
  const azimuthalAngle = useContext(RotationContext); // Get the azimuthal angle from context
  const prevAzimuthalAngle = useRef(azimuthalAngle); // To store the previous azimuthal angle
  const modelRef = useRef();

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

  // Animation setup
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
  const angleRef = useRef(4.725); // Start angle
  const positionRef = useRef(new THREE.Vector3(0, 0, 0)); // Store the position

  // Smoothing factor
  const smoothingFactor = 0.2;

  useFrame((_, delta) => {
    if (mixer.current && animationAction.current) {
      // Calculate rotation difference
      const rotationDelta = azimuthalAngle - prevAzimuthalAngle.current;

      // Smoothly interpolate angle
      angleRef.current -= rotationDelta;

      // Calculate new position
      const targetPosition = new THREE.Vector3(
        radius * -Math.cos(angleRef.current),
        0,
        radius * -Math.sin(angleRef.current)
      );

      // Smoothly interpolate position
      positionRef.current.lerp(targetPosition, smoothingFactor);

      if (modelRef.current) {
        modelRef.current.position.copy(positionRef.current); // Set interpolated position
        modelRef.current.rotation.y = -angleRef.current; // Update rotation

        // Adjust animation speed, clamping to a max value
        const speed = THREE.MathUtils.clamp(rotationDelta * 100, -10, 10); // Cap speed
        animationAction.current.setEffectiveTimeScale(Math.abs(speed) / 2); // Ensure positive time scale
      }

      

      // Update mixer
      mixer.current.update(delta);

      // Update previous azimuthal angle
      prevAzimuthalAngle.current = azimuthalAngle;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={bluePantsModel}
      position={[0, 0, 42.5]}
      scale={[4, 4, 4]}
      rotation={[0, Math.PI / 2, 0]}
      receiveShadow
      castShadow
    />
  );
}

export default BluePantsMan;
