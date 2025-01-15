import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function Taxi(){
    
    const result = useLoader(GLTFLoader, '/low_poly_car_model.glb');
    const carRef = useRef();
    
    const radius = 34; 
    const speed = 0.004; 
    let angle = 30; 

    useFrame(() => {
        if (carRef.current) {
            angle -= speed;
            carRef.current.position.x = (radius * Math.cos(angle)); 
            carRef.current.position.z = (radius * Math.sin(angle)); 
            
            carRef.current.rotation.y = -angle + -Math.PI;
        }
    });

    return(
        <>
            <primitive ref={carRef} object={result.scene} position={[0,0,35]} scale={[1.5, 1.5, 1.5]}/>
        </>
    );
}
export default Taxi;

