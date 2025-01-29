import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useContext, useMemo } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { DarkmodeContext } from "../App";

function ParkLight({ position, scale }) {
  const parkLightModel = useLoader(GLTFLoader, '/low_poly_street_lamp.glb');
  
  // Memoize the cloned scene to avoid unnecessary computations
  const clonedParkLight = useMemo(() => {
    const clonedScene = parkLightModel.scene.clone();
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        if (child.material) {
          child.material.transparent = false;
          child.material.opacity = 1.0;
        }
      }
    });
    return clonedScene;
  }, [parkLightModel]);

  return (
    <>
      <pointLight position={[position[0] - 2, 14, position[2]]} color={0xffffff} intensity={75} />
      <pointLight position={[position[0] + 2, 14, position[2]]} color={0xffffff} intensity={75} />
      <pointLight position={[position[0], 14, position[2] - 2]} color={0xffffff} intensity={75} />
      <pointLight position={[position[0], 14, position[2] + 2]} color={0xffffff} intensity={75} />
      <primitive object={clonedParkLight} position={position} scale={scale} receiveShadow />
    </>
  );
}

function CarLight({ darkMode }) {
    const frontLeftLight = useRef();
    const frontRightLight = useRef();
    const backLeftLight = useRef();
    const backRightLight = useRef();
  
    const leftRadius = 33;
    const rightRadius = 36;
    const speed = 0.004;
    const angleRef = useRef(-30.21); // Store angle using ref
  
    useFrame(() => {
      if (frontLeftLight.current) {
        angleRef.current -= speed;
        // Update positions of lights based on radius and angle
        const frontLeftPosition = new THREE.Vector3(leftRadius * Math.cos(angleRef.current), 1.5, leftRadius * Math.sin(angleRef.current));
        const frontRightPosition = new THREE.Vector3(rightRadius * Math.cos(angleRef.current), 1.5, rightRadius * Math.sin(angleRef.current));
        const backLeftPosition = new THREE.Vector3(leftRadius * Math.cos(angleRef.current + 0.4), 1.5, leftRadius * Math.sin(angleRef.current + 0.4));
        const backRightPosition = new THREE.Vector3(rightRadius * Math.cos(angleRef.current + 0.4), 1.5, rightRadius * Math.sin(angleRef.current + 0.4));
  
        // Set the new positions to the lights
        frontLeftLight.current.position.copy(frontLeftPosition);
        frontRightLight.current.position.copy(frontRightPosition);
        backLeftLight.current.position.copy(backLeftPosition);
        backRightLight.current.position.copy(backRightPosition);
      }
    });
  
    const lightIntensity = darkMode ? 25 : 0; // Set intensity to 0 when darkMode is enabled
  
    return (
      <>
        <pointLight ref={frontLeftLight} color={0xffffff} intensity={lightIntensity} position={[5, 1.5, 20.5]} />
        <pointLight ref={frontRightLight} color={0xffffff} intensity={lightIntensity} position={[5, 1.5, 20.5]} />
        <pointLight ref={backLeftLight} color={0xff0000} intensity={lightIntensity} position={[5, 1.5, 20.5]} />
        <pointLight ref={backRightLight} color={0xff0000} intensity={lightIntensity} position={[5, 1.5, 20.5]} />
      </>
    );
}
  

function SubLight() {
  const { darkMode } = useContext(DarkmodeContext);

  return (
    <>
      {/* CarLight is always rendered but invisible */}
      <CarLight darkMode={darkMode} />

      {darkMode && (
        <>
          <pointLight color={0xff0000} intensity={100} position={[0, 30, 0]} />
          <mesh position={[-0.1, 36, 0.2]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color={0x000000} emissive={0x612410} emissiveIntensity={3} />
          </mesh>

          <mesh position={[-44.5, 0, 20]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color={0xbf9522} emissive={0x612410} emissiveIntensity={4} />
          </mesh>
          <pointLight color={0x612410} intensity={100} position={[-44.5, 1, 20]} />
        </>
      )}

      <ParkLight position={[-26, 0, -40]} scale={[0.055, 0.055, 0.055]} />
      <ParkLight position={[26, 0, -40]} scale={[0.055, 0.055, 0.055]} />
      <ParkLight position={[-26, 0, 40]} scale={[0.055, 0.055, 0.055]} />
      <ParkLight position={[26, 0, 40]} scale={[0.055, 0.055, 0.055]} />
    </>
  );
}

export default SubLight;
