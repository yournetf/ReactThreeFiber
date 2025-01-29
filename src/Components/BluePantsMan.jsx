import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useContext, useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RotationContext, DarkmodeContext } from "../App";

function BluePantsMan() {
  const spotLightRef = useRef();
  const azimuthalAngle = useContext(RotationContext);
  const { darkMode } = useContext(DarkmodeContext);
  const prevAzimuthalAngle = useRef(azimuthalAngle);
  const modelRef = useRef();

  // Initialize targetRef with a placeholder object (necessary to render the spotlight).
  const targetRef = useRef(new THREE.Object3D()); 

  // Whenever darkMode is toggled from dark to light, ensures the targetRef doesn't switch to null.
  useEffect(()=>{
    if(targetRef.current == null){
      targetRef.current = new THREE.Object3D();
    }
  }, [darkMode]);

  // Loads the bluePantsMan and applies properties for shading and texture.
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

  // Creates references for animations and triggers their use when the model has loaded.
  const mixer = useRef();
  const animationAction = useRef();
  useEffect(() => {
    if (bluePantsModel.animations && bluePantsModel.animations.length) {
      mixer.current = new THREE.AnimationMixer(bluePantsModel);
      animationAction.current = mixer.current.clipAction(bluePantsModel.animations[0]);
      animationAction.current.play();
    }
  }, [bluePantsModel]);


  // Creates attributes for positional changes throughout the world and updates. Uses smoothing + game loop to smoothly traverse the world.
  const radius = 42.5;
  const angleRef = useRef(4.725);
  const positionRef = useRef(new THREE.Vector3(0, 0, 0));
  const lightPositionRef = useRef(new THREE.Vector3(0, 0, 0));
  const smoothingFactor = 0.1;

  useFrame((_, delta) => {
    if (mixer.current && animationAction.current) {
      const rotationDelta = azimuthalAngle - prevAzimuthalAngle.current;
      angleRef.current -= rotationDelta;

      // Calculate the position of the BluePantsMan as well as the target that the spotlight points to.
      const targetPosition = new THREE.Vector3(
        radius * -Math.cos(angleRef.current),
        0,
        radius * -Math.sin(angleRef.current)
      );
      positionRef.current.lerp(targetPosition, smoothingFactor);

      // Calculate the position of the spotLight.
      const lightPosition = new THREE.Vector3(
        (radius + 50) * -Math.cos(angleRef.current),
        50,
        (radius + 50) * -Math.sin(angleRef.current)
      );
      lightPositionRef.current.lerp(lightPosition, smoothingFactor);

      if (modelRef.current) {
        modelRef.current.position.copy(positionRef.current);
        modelRef.current.rotation.y = -angleRef.current;

        const speed = THREE.MathUtils.clamp(rotationDelta * 100, -10, 10);
        animationAction.current.setEffectiveTimeScale(Math.abs(speed) / 2);
      }

      if (spotLightRef.current) {
        spotLightRef.current.position.copy(lightPositionRef.current);
      }

      mixer.current.update(delta);
      prevAzimuthalAngle.current = azimuthalAngle;
    }

    if (targetRef.current && modelRef.current) {
      targetRef.current.position.copy(modelRef.current.position); // Update target position
      targetRef.current.updateMatrixWorld(); // Ensure it is updated in the scene
    }
  });

  // Memoize the spotlight's properties (position and target) based on darkMode
  const spotlightProperties = useMemo(() => {
    if (darkMode) {
      const lightPosition = new THREE.Vector3(
        (radius + 50) * -Math.cos(angleRef.current),
        50,
        (radius + 50) * -Math.sin(angleRef.current)
      );
      return {
        position: lightPosition,
        intensity: 5000,
        angle: Math.PI / 20,
        penumbra: 0.75,
      };
    }
    return {};
  }, [darkMode, angleRef.current, radius]);

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

      {darkMode && targetRef.current && (
        <>
          {/* Spotlight with memoized properties */}
          <spotLight
            ref={spotLightRef}
            color={0xffffff}
            intensity={spotlightProperties.intensity}
            angle={spotlightProperties.angle}
            position={spotlightProperties.position}
            penumbra={spotlightProperties.penumbra}
            target={targetRef.current}
            castShadow
          />
          <object3D ref={targetRef} />
        </>
      )}
    </>
  );
}

export default BluePantsMan;
