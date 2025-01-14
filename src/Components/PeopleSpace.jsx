import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

function PeopleSpace(){
    // Load FBX Model
    const jumpingModel = useLoader(FBXLoader, '/JumpingJacks.fbx');
    jumpingModel.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            if(child.material){
                child.material.transparent = false;
                child.material.opacity = 1.0;
            }
        }
    });

    //Animate
    const mixer = useRef();
    useEffect(() => {
        if (jumpingModel.animations && jumpingModel.animations.length) {
            // Create AnimationMixer and play the first animation
            mixer.current = new THREE.AnimationMixer(jumpingModel);
            const action = mixer.current.clipAction(jumpingModel.animations[0]);
            action.play();
        }
    }, [jumpingModel]);

    //Update the animation mixer on each frame where state isn't effected and delta is the time elapsed since the last frame.
    //Therefore, the animation progression coincides with the actual time passsed.
    useFrame((_, delta) => {
        mixer.current?.update(delta);
    });

    return(
        <>
            <primitive object={jumpingModel} position={[0, 0, 50]} scale={[0.1, 0.1, 0.1]}/>
        </>
    );
}
export default PeopleSpace;