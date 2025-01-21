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

    // Play animation
    const mixer = useRef();
    const animationAction = useRef();
    useEffect(() => {
        if (bluePantsModel.animations && bluePantsModel.animations.length) {
        mixer.current = new THREE.AnimationMixer(bluePantsModel);
        animationAction.current = mixer.current.clipAction(bluePantsModel.animations[0]);
        animationAction.current.play();
        }
    }, [bluePantsModel]);

    //Animation and position handling in reference to the world rotation.
    useFrame((_, delta) => {
        if (mixer.current && animationAction.current) {
        // Calculate rotation difference
        const rotationDelta = azimuthalAngle - prevAzimuthalAngle.current;

        // Adjust animation speed based on rotation
        const speed = rotationDelta * 100;
        animationAction.current.setEffectiveTimeScale(speed);

        // Update mixer
        mixer.current.update(delta);

        // Update previous azimuthal angle
        prevAzimuthalAngle.current = azimuthalAngle;
        }
    });

    return <primitive ref={modelRef} object={bluePantsModel} position={[0, 0, 42.5]} scale={[4, 4, 4]} rotation={[0, Math.PI/2, 0]}/>;
}

export default BluePantsMan;
