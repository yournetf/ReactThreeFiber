import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";

function PublicPhone(){
    const publicPhoneModel = useLoader(GLTFLoader, `/telephone_public_low_poly.glb`);
    publicPhoneModel.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
    return(
        <>
            <primitive object={publicPhoneModel.scene} position={[-6, 0.1, 25]} scale={[3, 3, 3]} rotation={[0, Math.PI /2, 0]} castShadow receiveShadow/>
        </>
    );
}

function InnerSidewalkSpace(){
    return(
        <>
            <PublicPhone/>
        </>
    );
}
export default React.memo(InnerSidewalkSpace);