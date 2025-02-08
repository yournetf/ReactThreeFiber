import { Svg } from "@react-three/drei";
import { useState, useContext, useRef, forwardRef } from "react";
import { useCursor } from "@react-three/drei";
import minusSymbol from "/minus-square-svgrepo-com.svg";
import plusSymbol from "/plus-square-svgrepo-com.svg";
import githubSymbol from "/github-svgrepo-com.svg";
import resumeSymbol from "/information-svgrepo-com.svg";
import certificationSymbol from "/certification-svgrepo-com.svg";
import appSymbol from "/app-1-svgrepo-com.svg";
import mailSymbol from "/contact-letter-box-svgrepo-com.svg";
import linkedInSymbol from "/linkedin-linked-in-svgrepo-com.svg";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

import { RotationContext } from "../App";
import "../Styles/ToolBar.css";

const ClickableIcon = forwardRef(({ source, iconScale, positionAry, onClickFunction }, ref) => {
    const radius = 50;
    return (
        <group ref={ref} position={positionAry}>
            <Svg
                src={source}
                scale={iconScale}
                onClick={onClickFunction}
            />
            radius * -Math.cos(angleRef.current),
                0,
                radius * -Math.sin(angleRef.current)
            <mesh position={[2.3, -4, 5]} onClick={onClickFunction}>
                <boxGeometry args={[5, 5, 5]} />
                <meshBasicMaterial color={'red'} transparent={true} opacity={1} />
            </mesh>
        </group>
    );
});

function ToolBar() {

    const [taskBarOpen, setTaskBarOpen] = useState(false);

    const opening = () => setTaskBarOpen(true);
    const closing = () => setTaskBarOpen(false);

    // A reference to the plus button Component.
    const plusRef = useRef();
    
    // References to the rotation of the canvas, and references to dynamically alter positioning.
    const azimuthalAngle = useContext(RotationContext);
    const prevAzimuthalAngle = useRef(azimuthalAngle);

    const radius = 50; 
    const angleRef = useRef(4.725);
    const smoothingFactor = 0.1;
    const positionRef = useRef(new THREE.Vector3(0, 0, 0));
    
    useFrame((_, delta) => {
        if(plusRef.current){
            const rotationDelta = azimuthalAngle - prevAzimuthalAngle.current;
            angleRef.current -= rotationDelta;
            // Compute the target position for the model
            const targetPosition = new THREE.Vector3(
                radius * -Math.cos(angleRef.current - 0.05),
                0,
                radius * -Math.sin(angleRef.current - 0.05)
            );
            positionRef.current.lerp(targetPosition, smoothingFactor);
            if (plusRef.current.position) {
                plusRef.current.position.copy(positionRef.current);
                plusRef.current.rotation.y = -angleRef.current + Math.PI/2;
            }
            prevAzimuthalAngle.current = azimuthalAngle;
        }
        
    });

    return (
        <>
            {/* ToolBar */}
            {taskBarOpen ? (
                <>
                <ClickableIcon 
                    source={minusSymbol} 
                    iconScale={0.15} 
                    positionAry={[-2.25, 0, 50]} 
                    onClickFunction={closing}
                />

                {/* GitHub Link */}
                <ClickableIcon
                    source={githubSymbol}
                    iconScale={0.15}
                    positionAry={[3.75, 0, 50]}
                    onClickFunction={()=>{window.open("https://github.com", "_blank")}}
                />

                <ClickableIcon
                    source={resumeSymbol}
                    iconScale={0.08}
                    positionAry={[9.75, 0, 50]}
                    onClickFunction={() =>{window.open("/Frank_Yournet_Resume.pdf", "_blank")}}
                />

                <ClickableIcon
                    source={certificationSymbol}
                    iconScale={0.2}
                    positionAry={[15.25, 0, 50]}
                    onClickFunction={() => window.open("AWS_Course_Completion_Certificate.pdf", "_blank")}
                />

                <ClickableIcon
                    source={linkedInSymbol}
                    iconScale={0.15}
                    positionAry={[-8.25, 0, 50]}
                    onClickFunction={() => window.open("https://www.linkedin.com/in/frank-yournet", "_blank")}
                />

                <ClickableIcon
                    source={appSymbol}
                    iconScale={0.005}
                    positionAry={[-13.75, 0, 50]}
                    onClickFunction={() => window.open("https://github.com/yournetf/StatSavvy", "_blank")}
                />

                <ClickableIcon
                    source={mailSymbol}
                    iconScale={0.08}
                    positionAry={[-19.25, 0, 50]}
                    onClickFunction={() => window.open("mailto:frankyournet@gmail.com", "_blank")}
                />
                </>
            ) : (
                <ClickableIcon 
                    ref={plusRef}
                    source={plusSymbol} 
                    iconScale={0.15} 
                    positionAry={[-2.25, 0, 50]} 
                    onClickFunction={opening} 
                />
            )}

            
        </>
    );
}

export default ToolBar;
