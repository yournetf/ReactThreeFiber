import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function YellowPantsWoman(){
    
    //Load Model.
    const yellowPantsModel = useLoader(FBXLoader, '/YellowPantsWoman.fbx');
    yellowPantsModel.traverse((child)=>{
        if(child.isMesh){
            child.castShadow = true;
            child.receiveShadow = true;
            if(child.material){
                child.material.transparent = false;
                child.material.opacity = 1.0;
            }            
        }
    });

    //Play animation.
    const mixer = useRef();
    useEffect(() => {
        if (yellowPantsModel.animations && yellowPantsModel.animations.length) {
            // Create AnimationMixer and play the first animation
            mixer.current = new THREE.AnimationMixer(yellowPantsModel);
            const action = mixer.current.clipAction(yellowPantsModel.animations[0]);
            action.play();
        }
    }, [yellowPantsModel]);
    
    const modelRef = useRef();
    const radius = 27.75; 
    const speed = 0.0025; 
    const angleRef = useRef(-30); // Start angle
    const positionRef = useRef(new THREE.Vector3(0, 0, 0)); // Store the position

    useFrame((_, delta) => {
        mixer.current?.update(delta);

        if (modelRef.current) {
            angleRef.current += speed;
            const x = radius * Math.cos(angleRef.current);
            const z = radius * Math.sin(angleRef.current);

            modelRef.current.position.set(x, 0, z); // Set the new position
            positionRef.current.set(x, 0, z);

            modelRef.current.rotation.y = -angleRef.current; // Rotate to face movement direction
        }
    });

    
    return(
        <>
            <primitive ref={modelRef} object={yellowPantsModel} position={[-50, 0, 0]} scale={[0.05, 0.05, 0.05]} />
        </>
    );
}
export default YellowPantsWoman;