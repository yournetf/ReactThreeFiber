import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Planet(){
    
    const result = useLoader(GLTFLoader, '/Planet_1.gltf');
    return(
        <>
            <primitive object={result.scene} scale={[20, 20, 20]} position={[0,0,0]}/>
        </>
    );
}
export default Planet;

