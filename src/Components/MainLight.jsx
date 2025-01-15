import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";
function MainLight(){
    const light = useRef();
    const light2 = useRef();
    useHelper(light, SpotLightHelper, 'white');
    return (
        <>
          {/* <spotLight 
            castShadow 
            ref={light}
            intensity={20000}
            color={0xffffff} 
            position={[-50, 50, 40]}
            angle={0.8}
          />
          <directionalLight 
            position={[2, 5, 2]}
          /> */}
          
        </>
    );
}
export default MainLight;