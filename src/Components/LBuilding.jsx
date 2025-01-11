import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function LBuilding(){
    
    const result = useLoader(GLTFLoader, '/Building_L.gltf');
    return(
        <>
            <primitive object={result.scene} position={[-3,0,3]}/>
        </>
    );
}
export default LBuilding;

