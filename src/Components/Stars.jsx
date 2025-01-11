import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Star({ position }){
    return(
        <mesh position={position}>
            <sphereGeometry args={[0.25, 10, 10]}/>
            <meshBasicMaterial color={0xffffff}/>
        </mesh>
    );
}


function Stars(){

    const starComponents = [];
    for(let i = 0; i < 200; i++){
        const positionAry = [
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
        ];
        starComponents.push(<Star key={i} position={positionAry}/>)
    }

    const groupRef = useRef();

    useFrame(()=>{
        groupRef.current.rotation.x += 0.0005;
        groupRef.current.rotation.y += 0.0005;
    })

    return(
        <group ref={groupRef}>
            {starComponents}
        </group>
    );
}
export default Stars;