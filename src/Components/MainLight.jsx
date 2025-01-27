import { useRef, useContext } from "react";
import { useHelper } from "@react-three/drei";
import { SpotLightHelper } from "three";
import { DarkmodeContext } from "../App";
import React from "react";

function MainLight(){
    const light = useRef();
    // useHelper(light, SpotLightHelper, 'white');
    
    const {darkMode, setDarkMode} = useContext(DarkmodeContext)
    return (
        <>
        {darkMode === false ? 
        
        <>
          
          <spotLight 
            castShadow 
            ref={light}
            intensity={10000}
            color={0xffffff} 
            position={[-50, 50, 40]}
            angle={0.8}
          />
          <directionalLight 
            position={[2, 5, 2]}
          />

        </>
        
        :
        
        <>
          {/* Turn Lights Off */}
        </>
        
        }
        </>
    );
}
export default React.memo(MainLight);