import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";
import { useControls } from "leva";
import { color } from "three/tsl";


function AnimatedBox(){

    const boxRef = useRef();

      const {speed, color} = useControls({
        color: '#ffffff',
        speed: {
          value: 0.005,
          min: 0.0,  
          max: 0.03,
          step: 0.001
        },
      });

    useFrame(()=>{
        boxRef.current.rotation.x += speed;
        boxRef.current.rotation.y += speed;
        boxRef.current.rotation.z += speed;
    })

    return(
        <mesh ref={boxRef}>
            <boxGeometry args={[2, 3, 2]}/>
            <meshToonMaterial color={color}/>
        </mesh>
    );
}

export default AnimatedBox;