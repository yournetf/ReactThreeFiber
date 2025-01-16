import { useFrame } from "@react-three/fiber";
import { useContext, useRef } from "react";
import { DarkmodeContext } from "../App";

function Star({ position }){
    return(
        <mesh position={position}>
            <sphereGeometry args={[0.25, 10, 10]} />
            <meshBasicMaterial color={0xffffff} />
        </mesh>
    );
}


function Stars(){

    const starComponents = [];
    const radius = 60;
    
    for(let i = 0; i < 200; i++){
        // Random angle.
        const theta = Math.random() * 2 * Math.PI; 
        // Random polar angle.
        const phi = Math.acos((Math.random() * 2) - 1); 
        const positionAry = [
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi),
        ];
        starComponents.push(<Star key={i} position={positionAry}/>)
    }

    const groupRef = useRef();

    useFrame(()=>{
        // If Stars aren't renderered, then don't execute.
        if(groupRef.current){
            groupRef.current.rotation.x += 0.0005;
            groupRef.current.rotation.y += 0.0005;
        }
    })

    const {darkMode, setDarkMode} = useContext(DarkmodeContext);

    return(
        <>
            {darkMode === false ?
                <></>
                :
                <group ref={groupRef}>
                    {starComponents}
                </group>
            }
        </>         
    );
}
export default Stars;