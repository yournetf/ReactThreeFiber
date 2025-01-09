import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";


function AnimatedBox(){

    const boxRef = useRef();

    useFrame(()=>{
        boxRef.current.rotation.x += 0.005;
        boxRef.current.rotation.y += 0.005;
        boxRef.current.rotation.z += 0.005;
    })

    return(
        <mesh ref={boxRef}>
            <boxGeometry args={[2, 3, 2]}/>
            <meshToonMaterial color={'green'}/>
        </mesh>
    );
}

export default AnimatedBox;