import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function Taxi(){
    
    const result = useLoader(GLTFLoader, '/low_poly_car_model.glb');
    const carRef = useRef();
    
    const radius = 34; 
    const speed = 0.004; 
    const angleRef = useRef(-30); // Start angle
    const positionRef = useRef(new THREE.Vector3(0, 0, 0)); // Store the position

    useFrame(() => {
        if (carRef.current) {
            angleRef.current -= speed;
            const x = radius * Math.cos(angleRef.current);
            const z = radius * Math.sin(angleRef.current);
            
            carRef.current.position.set(x, 0, z); // Set the new position
            positionRef.current.set(x, 0, z);
            
            carRef.current.rotation.y = -angleRef.current + -Math.PI;
        }
    });

    return(
        <>
            <primitive ref={carRef} object={result.scene} position={[0,0,35]} scale={[1.5, 1.5, 1.5]}/>
        </>
    );
}
export default Taxi;

