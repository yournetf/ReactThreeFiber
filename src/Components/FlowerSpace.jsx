import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";
import React from "react";

function FlowerSpace(){
    function Flower({ position, scale, flowerType }){
        const flowerModel = useLoader(GLTFLoader, `/Flower${flowerType}.glb`);
        const clonedFlower = useMemo(() => flowerModel.scene.clone(), [flowerModel]);
    
        clonedFlower.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        return(
            <>
                <primitive object={clonedFlower} position={position} scale={scale} castShadow/>
            </>
        );
    };
    
    return(
        <>
            {/* Front Left Tree */}
            <Flower flowerType={4} position={[26, 0, 40]}/>
            <Flower flowerType={1} position={[22, 0, 41]}/>
            <Flower flowerType={5} position={[17, 0, 43]}/>
            <Flower flowerType={3} position={[14, 0, 46]}/>

            {/* In Between Front Trees */}
            
        
            {/* Front Right Tree */}
            <Flower flowerType={4} position={[-26, 0, 40]}/>
            <Flower flowerType={1} position={[-22, 0, 41]}/>
            <Flower flowerType={5} position={[-17, 0, 43]}/>
            <Flower flowerType={3} position={[-14, 0, 46]}/>
            
            {/* Back Left Tree */}
            <Flower flowerType={3} position={[-37, 0, -28]}/>
            <Flower flowerType={4} position={[-42, 0, -20]}/>
            <Flower flowerType={5} position={[-37, 0, -32]}/>
            <Flower flowerType={1} position={[-45, 0, -18]}/>
            
            {/* Back Right Tree */}
            <Flower flowerType={3} position={[37, 0, -28]}/>
            <Flower flowerType={4} position={[42, 0, -20]}/>
            <Flower flowerType={5} position={[37, 0, -32]}/>
            <Flower flowerType={1} position={[45, 0, -18]}/>
        </>
    );
}
export default React.memo(FlowerSpace);