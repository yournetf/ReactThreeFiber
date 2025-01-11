import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";
function MainLight(){
    const light = useRef();
    const light2 = useRef();
    useHelper(light, SpotLightHelper, 'white');
    return (
        <>
          <spotLight 
            castShadow 
            ref={light}
            intensity={15000}
            color={0xffffff} 
            position={[-50, 20, 60]}
            angle={1}
          />
          <directionalLight 
            position={[2, 5, 2]}
          />
          
        </>
    );
}
export default MainLight;