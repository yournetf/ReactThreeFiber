import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

function BluePantsMan(){
    const bluePantsModel = useLoader(FBXLoader, '/BluePantsMan.fbx');
    bluePantsModel.traverse((child)=>{
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
        if (bluePantsModel.animations && bluePantsModel.animations.length) {
            // Create AnimationMixer and play the first animation
            mixer.current = new THREE.AnimationMixer(bluePantsModel);
            const action = mixer.current.clipAction(bluePantsModel.animations[0]);
            action.play();
        }
    }, [bluePantsModel]);
    
    useFrame((_, delta) => {
        mixer.current?.update(delta);
    });
    
    return(
        <>
            <primitive object={bluePantsModel} position={[47.5, 0, 0]} scale={[4, 4, 4]}/>
        </>
    );
}
export default BluePantsMan;