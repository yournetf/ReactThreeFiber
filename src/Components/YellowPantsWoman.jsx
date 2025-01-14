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
    let angle = -30; 
    useFrame((_, delta) => {
        mixer.current?.update(delta);
        //Manage rotation.
        if (modelRef.current) {
            angle += speed;
            modelRef.current.position.x = radius * Math.cos(angle); 
            modelRef.current.position.z = radius * Math.sin(angle); 
            
            modelRef.current.rotation.y = -angle;
        }
    });
    
    return(
        <>
            <primitive ref={modelRef} object={yellowPantsModel} position={[-50, 0, 0]} scale={[0.05, 0.05, 0.05]} />
        </>
    );
}
export default YellowPantsWoman;