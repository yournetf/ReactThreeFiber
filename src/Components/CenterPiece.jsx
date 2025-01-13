import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


function CenterPiece(){
    const empireModel = useLoader(GLTFLoader, `/low_poly_empire_state_building.glb`);
    empireModel.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
            
    return(
        <>
            {/* Hill */}
            <mesh rotation={[-Math.PI, 0, 0]} position={[0, -20, 0]} scale={[1, 1, 1]} castShadow receiveShadow>
                <sphereGeometry args={[32, 1000, 400, 10, 8, 2, 2]}/>
                <meshStandardMaterial color={'#a1a19a'}/>
            </mesh> 
            
            <primitive object={empireModel.scene} position={[0, 9, 0]} scale={[5, 5, 5]} castShadow receiveShadow/>           
        </>
    );
}
export default CenterPiece;