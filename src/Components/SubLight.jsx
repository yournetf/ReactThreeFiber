import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useContext, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useHelper } from "@react-three/drei";
import { PointLightHelper } from "three";
import { DarkmodeContext } from "../App";


function ParkLight({position, scale}){
    const parkLightModel = useLoader(GLTFLoader, '/low_poly_street_lamp.glb');
    const clonedParkLight = useMemo(() => parkLightModel.scene.clone(), [parkLightModel]);
    clonedParkLight.traverse((child)=>{
        if(child.isMesh){
            child.castShadow = true;
            child.receiveShadow = true;
            if(child.material){
                child.material.transparent = false;
                child.material.opacity = 1.0;
            }     
        }
    });
    
    
    
    return(
        <>
            <pointLight     
                position={[position[0]-2, 14, position[2]]}
                color={0xffffff}
                intensity={75}
            />
            <pointLight     
                
                position={[position[0]+2, 14, position[2]]}
                color={0xffffff}
                intensity={75}
            />
            <pointLight     
                
                position={[position[0], 14, position[2]-2]}
                color={0xffffff}
                intensity={75}
            />
            <pointLight     
                
                position={[position[0], 14, position[2]+2]}
                color={0xffffff}
                intensity={75}
            />
            <primitive object={clonedParkLight} position={position} scale={scale} receiveShadow/>
        </>
        
    );
}

function CarLight(){
    const frontLeftLight = useRef();
    const frontRightLight = useRef();

    const backLeftLight = useRef();
    const backRightLight = useRef();

    // useHelper(frontLeftLight, PointLightHelper, 1);
    // useHelper(frontRightLight, PointLightHelper, 1);

    const leftRadius = 33; 
    const rightRadius = 36;
    const speed = 0.004; 
    let angle = 29.8; 
    useFrame(() => {
            if (frontLeftLight.current) {
                angle -= speed;
                frontLeftLight.current.position.x = (leftRadius * Math.cos(angle)); 
                frontLeftLight.current.position.z = (leftRadius * Math.sin(angle)); 

                frontRightLight.current.position.x = (rightRadius * Math.cos(angle)); 
                frontRightLight.current.position.z = (rightRadius * Math.sin(angle)); 

                backLeftLight.current.position.x = (leftRadius * Math.cos(angle+0.4)); 
                backLeftLight.current.position.z = (leftRadius * Math.sin(angle+0.4)); 

                backRightLight.current.position.x = (rightRadius * Math.cos(angle+0.4)); 
                backRightLight.current.position.z = (rightRadius * Math.sin(angle+0.4)); 
            }
        });
    
    return(
        <>
            <pointLight 
                ref={frontLeftLight}
                color={0xffffff}
                intensity={25}
                position={[5, 1.5, 20.5]}
            />
            <pointLight
                ref={frontRightLight}
                color={0xffffff}
                intensity={25}
                position={[5, 1.5, 20.5]}
            />
            <pointLight 
                ref={backLeftLight}
                color={0xff0000}
                intensity={10}
                position={[5, 1.5, 20.5]}
            />
            <pointLight
                ref={backRightLight}
                color={0xff0000}
                intensity={10}
                position={[5, 1.5, 20.5]}
            />
        </>
    );
}

function SubLight(){
    const {darkMode, setDarkMode} = useContext(DarkmodeContext);
    
    return(
        <>
            {darkMode === false ?
                <></>
                :
                <>
                    // Light in front/behind of the taxi.
                    <CarLight/>    
                    
                    // Light on the empire state tip.
                    <pointLight
                        color={0xff0000}
                        intensity={100} 
                        position={[0, 30, 0]} 
                    />
                    <mesh position={[-0.1, 36, 0.2]}>
                        <boxGeometry args={[0.4, 0.4, 0.4]}/>
                        <meshStandardMaterial color={0x000000} emissive={0x612410} emissiveIntensity={3}/>
                    </mesh>

                    // Light for picnic setting.
                    <mesh position={[-43, 0, 22]}>
                        <boxGeometry args={[0.4, 0.4, 0.4]}/>
                        <meshStandardMaterial color={0xbf9522} emissive={0x612410} emissiveIntensity={3}/>
                    </mesh>
                    <pointLight
                        color={0xff0000}
                        intensity={2}
                        position={[-47, 1, 0]}
                    />
                </>
            }
            
            <ParkLight position={[-26, 0,-40]} scale={[0.055, 0.055, 0.055]}/>
            <ParkLight position={[26, 0,-40]} scale={[0.055, 0.055, 0.055]}/>
            
            <ParkLight position={[-26, 0,40]} scale={[0.055, 0.055, 0.055]}/>
            <ParkLight position={[26, 0,40]} scale={[0.055, 0.055, 0.055]}/>
        </>
    );
}
export default SubLight;