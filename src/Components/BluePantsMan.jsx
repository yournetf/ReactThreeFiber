import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useContext, useEffect, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RotationContext, DarkmodeContext } from "../App";
import { Svg, Text } from "@react-three/drei";
import speechBubble from "/public/speech-bubble-svgrepo-com.svg"


function BluePantsMan() {
  const spotLightRef = useRef();
  const azimuthalAngle = useContext(RotationContext);
  const { darkMode } = useContext(DarkmodeContext);
  const prevAzimuthalAngle = useRef(azimuthalAngle);
  const modelRef = useRef();
  const textRef1 = useRef();
  const textRef2 = useRef();
  const textRef3 = useRef();
  const textRef4 = useRef();
  const bubbleRef = useRef();

  

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
  
      // Compute the target position for the model
      const targetPosition = new THREE.Vector3(
        radius * -Math.cos(angleRef.current),
        0,
        radius * -Math.sin(angleRef.current)
      );
      positionRef.current.lerp(targetPosition, smoothingFactor);
  
      // Compute the position for the speech bubble (apply the same smoothing)
      const bubbleTargetPosition = new THREE.Vector3(
        radius * -Math.cos(angleRef.current + 0.3),
        targetPosition.y + 20,
        radius * -Math.sin(angleRef.current + 0.3)
      );
  
      if (modelRef.current) {
        modelRef.current.position.copy(positionRef.current);
        modelRef.current.rotation.y = -angleRef.current;
  
        // Lerp the speech bubble's position to prevent it from "leading"
        bubbleRef.current.position.lerp(bubbleTargetPosition, smoothingFactor);
        textRef1.current.position.lerp(
          new THREE.Vector3(targetPosition.x, targetPosition.y + 13.2, targetPosition.z),
          smoothingFactor
        );
        textRef2.current.position.lerp(
          new THREE.Vector3(targetPosition.x, targetPosition.y + 12.5, targetPosition.z),
          smoothingFactor
        );
        textRef3.current.position.lerp(
          new THREE.Vector3(targetPosition.x, targetPosition.y + 12.7, targetPosition.z),
          smoothingFactor
        );
        textRef4.current.position.lerp(
          new THREE.Vector3(targetPosition.x, targetPosition.y + 12.5, targetPosition.z),
          smoothingFactor
        );
  
        // Ensure the speech bubble and text rotate correctly with the model
        bubbleRef.current.rotation.y = modelRef.current.rotation.y - Math.PI / 2;
        textRef1.current.rotation.y = modelRef.current.rotation.y - Math.PI / 2;
        textRef2.current.rotation.y = modelRef.current.rotation.y - Math.PI / 2;
        textRef3.current.rotation.y = modelRef.current.rotation.y - Math.PI / 2;
        textRef4.current.rotation.y = modelRef.current.rotation.y - Math.PI / 2;
  
        // Adjust animation speed
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
      targetRef.current.position.copy(modelRef.current.position);
      targetRef.current.updateMatrixWorld();
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
      {/* Speech Bubble SVG */}
      <Svg src={speechBubble} ref={bubbleRef} scale={new THREE.Vector3(0.1, 0.05, 0.05)} position={[0, -1, 50]} visible={true}/>
      
      {/* Texts in bubble */}
      <Text
        ref={textRef1}
        textAlign="center"
        position={[0, 4, 50]} 
        maxWidth={20}
        color={'black'}
        anchorX={"center"}
        anchorY={"bottom"}
        visible={(-0.5 < azimuthalAngle && azimuthalAngle < 0.5)}
      >
        My journey as a software engineer began in New York City.
      </Text>
      
      <Text
        ref={textRef2}
        textAlign="center"
        position={[0, 4, 50]} 
        maxWidth={20}
        color={'black'}
        anchorX={"center"}
        anchorY={"bottom"}
        visible={(1 < azimuthalAngle && azimuthalAngle < 2)}
      >
        I attended The Bronx High School of Science, home to the most Nobel Piece Prize winners in the world!
      </Text>
      
      <Text
        ref={textRef3}
        textAlign="center"
        position={[0, 4, 50]} 
        maxWidth={20}
        color={'black'}
        anchorX={"center"}
        anchorY={"bottom"}
        visible={(2.5 < azimuthalAngle || azimuthalAngle < -2.5)}
      >
        I then went to Queens College, where I studied Computer Science and built a strong foundation in theory.
      </Text>
      
      <Text
        ref={textRef4}
        textAlign="center"
        position={[0, 4, 50]} 
        maxWidth={20}
        color={'black'}
        anchorX={"center"}
        anchorY={"bottom"}
        visible={(-2 < azimuthalAngle && azimuthalAngle < -1)}
      >
        I graduated with Dean's List Honors and built projects, including this website and those on my GitHub!   
      </Text>



      {/* BluePantsMan model */}
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
