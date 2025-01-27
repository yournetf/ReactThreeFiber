import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";
import React from "react";

function Tree({ position, scale }){
    const treeModel = useLoader(GLTFLoader, '/Tree2_Green.glb');
    const clonedTree = useMemo(() => treeModel.scene.clone(), [treeModel]);

    clonedTree.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    return(
        <>
            <primitive object={clonedTree} position={position} scale={scale} castShadow receiveShadow/>
        </>
    );
};

function TreeSpace(){

    

    return(
        <>
            {/* Front Left Tree */}
            <Tree position={[-20, 5, 43]} scale={[2, 2, 2]}/>
            
            {/* Front Right Tree */}
            <Tree position={[20, 5, 43]} scale={[2, 2, 2]}/>

            {/* Back Left Tree */}
            <Tree position={[-40, 5, -24]} scale={[2, 2, 2]}/>

            {/* Back Right Tree */}
            <Tree position={[40, 5, -24]} scale={[2, 2, 2]}/>            
        </>
    );

}
export default React.memo(TreeSpace);
