import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo, useRef } from "react";


function ParkLight({position, scale}){
    const parkLightModel = useLoader(GLTFLoader, '/low_poly_street_lamp.glb');
    const clonedParkLight = useMemo(() => parkLightModel.scene.clone(), [parkLightModel]);
    clonedParkLight.traverse((child)=>{
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
        <>
            <pointLight     
                castShadow
                position={[position[0]-2, 14, position[2]]}
                color={0xffffff}
                intensity={100}
            />
            <pointLight     
                castShadow
                position={[position[0]+2, 14, position[2]]}
                color={0xffffff}
                intensity={100}
            />
            <pointLight     
                castShadow
                position={[position[0], 14, position[2]-2]}
                color={0xffffff}
                intensity={100}
            />
            <pointLight     
                castShadow
                position={[position[0], 14, position[2]+2]}
                color={0xffffff}
                intensity={100}
            />
            <primitive object={clonedParkLight} position={position} scale={scale} receiveShadow/>
        </>
        
    );
}

function SubLight(){
    
    return(
        <>
            <ParkLight position={[-26, 0,-40]} scale={[0.055, 0.055, 0.055]}/>
            <ParkLight position={[26, 0,-40]} scale={[0.055, 0.055, 0.055]}/>
        </>
    );
}
export default SubLight;