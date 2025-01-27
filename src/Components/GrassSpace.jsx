import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";
import { color } from "three/tsl";
import React from "react";

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
            <Bush bushType={2} bushColor={1} position={[10, 1, 46]} scale={[2, 2, 2]}/>
            <Reed position={[16.5, 0, 46]} scale={[2, 2, 2]}/>
            <Reed position={[24, 0, 42]} scale={[2, 2, 2]}/>
            <Bush bushType={2} bushColor={1} position={[29, 1, 37]} scale={[2, 2, 2]}/>

            {/* Front Left Tree */}
            <Bush bushType={2} bushColor={1} position={[-10, 1, 46]} scale={[2, 2, 2]}/>
            <Reed position={[-16.5, 0, 46]} scale={[2, 2, 2]}/>
            <Reed position={[-24, 0, 42]} scale={[2, 2, 2]}/>
            <Bush bushType={2} bushColor={1} position={[-29, 1, 37]} scale={[2, 2, 2]}/>

            {/* Back Right Tree */}
            <Bush bushType={1} bushColor={1} position={[45.5, 1, -14]} scale={[2, 2, 2]}/>
            <Reed position={[39.5, 0, -28]} scale={[2, 2, 2]}/>
            <Reed position={[43.5, 0, -22]} scale={[2, 2, 2]}/>
            <Bush bushType={1} bushColor={1} position={[33, 1, -34]} scale={[2, 2, 2]}/>

            {/* Back Left Tree */}
            <Bush bushType={1} bushColor={1} position={[-45.5, 1, -14]} scale={[2, 2, 2]}/>
            <Reed position={[-39.5, 0, -28]} scale={[2, 2, 2]}/>
            <Reed position={[-43.5, 0, -22]} scale={[2, 2, 2]}/>
            <Bush bushType={1} bushColor={1} position={[-33, 1, -34]} scale={[2, 2, 2]}/>
        </>
    );
}
export default React.memo(GrassSpace);