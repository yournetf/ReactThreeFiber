import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from "three";
import React from "react";

function Dog(){
    const dogModel = useLoader(FBXLoader, '/husky.fbx');
    const texture = new TextureLoader().load('/husky_brown.png');

    dogModel.traverse((child) => {
        //Keep the original mesh of the dog.
        if (child.isMesh || child.type === "SkinnedMesh") {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        //Hide or remove lines and bones (blue skeleton circles).
        if (child.type === "Line" || child.type === "Bone") {
            child.visible = false;
          } 
        //Load the textures onto the material.
        if(child.material){
            child.material.map = texture; // Apply the texture
            child.material.needsUpdate = true; // Ensure the material updates
        }
      });

    //Play animation.
    const mixer = useRef();
    useEffect(() => {
        if (dogModel.animations && dogModel.animations.length) {
            mixer.current = new THREE.AnimationMixer(dogModel);

            // Get the full animation clip
            const fullClip = dogModel.animations[0];

            // Create a subclip (e.g., between seconds 1.0 and 3.0)
            const waggingTailClip = THREE.AnimationUtils.subclip(
                fullClip, // Original clip
                "subclip", // Name for the subclip
                35, // Start frame (assuming 30 FPS, this is 1 second)
                60 // End frame (3 seconds)
            );

            // Add the subclip as an action
            const waggingTailAnimation = mixer.current.clipAction(waggingTailClip);
            // waggingTailAnimation.play();

            // Create a subclip (e.g., between seconds 1.0 and 3.0)
            const sittingClip = THREE.AnimationUtils.subclip(
                fullClip, // Original clip
                "subclip", // Name for the subclip
                15, // Start frame (assuming 30 FPS, this is 1 second)
                25, // End frame (3 seconds)
                10
            );

            // Add the subclip as an action
            const sittingAnimation = mixer.current.clipAction(sittingClip);
            sittingAnimation.fadeIn(1);
            sittingAnimation.loop = THREE.LoopOnce;
            // sittingAnimation.play();
        }
    }, [dogModel])
    
    useFrame((_, delta) => {
        mixer.current?.update(delta);
    });
    
    return(
        <>
            <primitive object={dogModel} position={[47, 0, 8]}/>
        </>
    );
}

function AnimalSpace(){
    return(
        <>
            {/* <Dog/> */}
        </>
    );
}
export default React.memo(AnimalSpace);