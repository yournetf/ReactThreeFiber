import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";

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
            <Bench position={[0, 0, -47]} scale={[0.04, 0.04, 0.04]} rotation={[0, -Math.PI/2, 0]}/>
            <Bench position={[-15, 0, -47]} scale={[0.04, 0.04, 0.04]} rotation={[0, -Math.PI/2, 0]}/>
            <Bench position={[15, 0, -47]} scale={[0.04, 0.04, 0.04]} rotation={[0, -Math.PI/2, 0]}/>
        </>
    );
}
export default BenchSpace;