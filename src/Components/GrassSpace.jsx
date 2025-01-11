import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";
import { color } from "three/tsl";

function GrassSpace(){
    function Reed({ position, scale }){
        const reedModel = useLoader(GLTFLoader, `/Reed.glb`);
        const clonedReed = useMemo(() => reedModel.scene.clone(), [reedModel]);
    
        clonedReed.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        return(
            <>
                <primitive object={clonedReed} position={position} scale={scale} castShadow/>
            </>
        );
    };
    
    function Bush({ position, scale, bushType, bushColor }){
        switch(bushType){
            case 1:
                bushType = "Circular";
                break;
            case 2:
                bushType = "Cuby";
                break;
            default:
                bushType = "Circular";
                break;
        }
        switch(bushColor){
            case 1:
                bushColor = "Green";
                break;
            case 2:
                bushColor = "Yellow";
                break;
            case 3: 
                bushColor = "Dark";
                break;
            default:
                bushColor = "Green";
                break;
        }
        const bushModel = useLoader(GLTFLoader, `/${bushType}Bush_${bushColor}.glb`);
        const clonedBush = useMemo(() => bushModel.scene.clone(), [bushModel]);
    
        clonedBush.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        return(
            <>
                <primitive object={clonedBush} position={position} scale={scale} castShadow/>
            </>
        );
    };
    return(
        <>
            {/* Front Right Tree */}
            <Reed position={[16.5, 0, 46]} scale={[2, 2, 2]}/>
            <Bush bushType={2} bushColor={1} position={[10, 1, 46]} scale={[2, 2, 2]}/>
        </>
    );
}
export default GrassSpace;