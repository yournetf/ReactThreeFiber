import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function PicnicMat(){
    const picnicMatModel = useLoader(GLTFLoader, `/picnic_set_free.glb`);
    picnicMatModel.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });
    return(
        <primitive object={picnicMatModel.scene} position={[-43.5, 0.1, 20]} scale={[1, 1, 1]}/>
    );
}

// function PicnicPerson(){
//     const picnicMatModel = useLoader(GLTFLoader, `/picnic_set_free.glb`);
//     picnicMatModel.scene.traverse((child) => {
//         if (child.isMesh) {
//             child.castShadow = true;
//         }
//     });
//     return(
//         <primitive object={picnicMatModel.scene} position={[-43.5, 0.1, 20]} scale={[1, 1, 1]}/>
//     );
// }

function PicnicSpace(){
    return(
        <PicnicMat/>
    );
}
export default PicnicSpace;