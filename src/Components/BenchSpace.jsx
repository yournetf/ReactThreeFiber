import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";
import React from "react";

function Bench({ position, scale, rotation }){
    const benchModel = useLoader(GLTFLoader, '/low_poly_bench.glb');
    const clonedBench = useMemo(() => benchModel.scene.clone(), [benchModel]);
    clonedBench.traverse((child)=>{
        if(child.isMesh){
            child.castShadow = true;
            child.receiveShadow = true;
            if(child.material){
                child.material.transparent = false;
                child.material.opacity = 1.0;
            }     
        }
    });
    return(
        <primitive object={clonedBench} position={position} scale={scale} rotation={rotation}/>
    );
}

function BenchSpace(){
    return(
        <>  
            {/* Right Bench */}
            <Bench position={[15, 0, -45]} scale={[0.04, 0.04, 0.04]} rotation={[0, -Math.PI/1.65, 0]}/>
            
            {/* Middle Bench */}
            <Bench position={[0, 0, -47.5]} scale={[0.04, 0.04, 0.04]} rotation={[0, -Math.PI/2, 0]}/>
            
            {/* Left Bench */}
            <Bench position={[-15, 0, -45]} scale={[0.04, 0.04, 0.04]} rotation={[0, -Math.PI/2.5, 0]}/>
        </>
    );
}
export default React.memo(BenchSpace);