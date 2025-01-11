import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";


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
        
            {/* Front Right Tree */}
            <Flower flowerType={2} position={[-22, 0, 41]}/>
            
            {/* Back Left Tree */}
            <Flower flowerType={3} position={[-40, 0, -26]}/>

            {/* Back Right Tree */}
            <Flower flowerType={5} position={[40, 0, -26]}/>
        </>
    );
}
export default FlowerSpace;