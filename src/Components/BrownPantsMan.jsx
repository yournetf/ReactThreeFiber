import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from 'three';
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function BrownPantsMan(){
    
    //Load Model.
    const brownPantsModel = useLoader(FBXLoader, '/BrownPantsMan.fbx');
    brownPantsModel.traverse((child)=>{
        if(child.isMesh){
            child.castShadow = true;
            child.receiveShadow = true;
            if(child.material){
                child.material.transparent = false;
                child.material.opacity = 1.0;
            }            
        }
    });

    //Play animation (Mixamo export uses the sitting pose as an animation, even though it's stagnant).
    const mixer = useRef();
    useEffect(() => {
        if (brownPantsModel.animations && brownPantsModel.animations.length) {
            // Create AnimationMixer and play the first animation
            mixer.current = new THREE.AnimationMixer(brownPantsModel);
            const action = mixer.current.clipAction(brownPantsModel.animations[0]);
            action.play();
        }
    }, [brownPantsModel]);
    
    useFrame((_, delta) => {
        mixer.current?.update(delta);
    });
    
    return(
        <>
            <primitive object={brownPantsModel} position={[-40, 0, 26.5]} scale={[0.02, 0.02, 0.02]} rotation={[0, Math.PI/0.9, 0]}/>
        </>
    );
}
export default BrownPantsMan;