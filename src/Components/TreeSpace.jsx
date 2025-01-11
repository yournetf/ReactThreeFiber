import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useMemo } from "react";

function Tree({ position, scale }){
    const treeModel = useLoader(GLTFLoader, '/Tree2_Green.glb');
    const clonedTree = useMemo(() => treeModel.scene.clone(), [treeModel]);

    clonedTree.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
    return(
        <>
            <primitive object={clonedTree} position={position} scale={scale} castShadow/>
        </>
    );
};

function TreeSpace(){

    

    return(
        <>
            <Tree position={[-20, 5, 43]} scale={[2, 2, 2]}/>
            <Tree position={[40, 5, -24]} scale={[2, 2, 2]}/>
            <Tree position={[-40, 5, -24]} scale={[2, 2, 2]}/>
            <Tree position={[20, 5, 43]} scale={[2, 2, 2]}/>
            <Tree position={[20, 5, 43]} scale={[2, 2, 2]}/>
        </>
    );

}
export default TreeSpace;
