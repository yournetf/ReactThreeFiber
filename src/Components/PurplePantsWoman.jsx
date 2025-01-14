import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function PurplePantsWoman(){
    
    //Load Model.
    const purplePantsModel = useLoader(FBXLoader, '/PurplePantsWoman.fbx');
    purplePantsModel.traverse((child)=>{
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
        if (purplePantsModel.animations && purplePantsModel.animations.length) {
            // Create AnimationMixer and play the first animation
            mixer.current = new THREE.AnimationMixer(purplePantsModel);
            const action = mixer.current.clipAction(purplePantsModel.animations[0]);
            action.play();
        }
    }, [purplePantsModel]);
    
    useFrame((_, delta) => {
        mixer.current?.update(delta);
    });
    
    return(
        <>
            <primitive object={purplePantsModel} position={[-45.5, 0, 13]} scale={[0.05, 0.05, 0.05]} rotation={[0, Math.PI/10, 0]}/>
        </>
    );
}
export default PurplePantsWoman;