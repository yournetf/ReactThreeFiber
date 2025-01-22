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


    const radius = 42.5; 
    const angleRef = useRef(4.725); // Start angle
    const positionRef = useRef(new THREE.Vector3(0, 0, 0)); // Store the position
    
    
    //Animation and position handling in reference to the world rotation.
    useFrame((_, delta) => {
        
        //Update the animation.
        if (mixer.current && animationAction.current) {
            // Calculate rotation difference
            const rotationDelta = azimuthalAngle - prevAzimuthalAngle.current;

            // Adjust animation speed based on rotation
            const speed = rotationDelta * 100;
            animationAction.current.setEffectiveTimeScale(speed/2);


            //Update the positioning.
            if (modelRef.current) {
                angleRef.current -= rotationDelta;
                const x = radius * -Math.cos(angleRef.current);
                const z = radius * -Math.sin(angleRef.current);
                
                modelRef.current.position.set(x, 0, z); // Set the new position
                positionRef.current.set(x, 0, z);
                
                modelRef.current.rotation.y = -angleRef.current;
            } 

            // Update mixer
            mixer.current.update(delta);

            // Update previous azimuthal angle
            prevAzimuthalAngle.current = azimuthalAngle;
        }

        
    });

    return <primitive ref={modelRef} object={bluePantsModel} position={[0, 0, 42.5]} scale={[4, 4, 4]} rotation={[0, Math.PI/2, 0]} receiveShadow castShadow/>;
}

export default BluePantsMan;
