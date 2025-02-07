import { Svg } from "@react-three/drei";
import { useState } from "react";
import { useCursor } from "@react-three/drei";
import minusSymbol from "/minus-square-svgrepo-com.svg";
import plusSymbol from "/plus-square-svgrepo-com.svg";
import githubSymbol from "/github-svgrepo-com.svg";
import resumeSymbol from "/information-svgrepo-com.svg";
import certificationSymbol from "/certification-svgrepo-com.svg";
import appSymbol from "/app-1-svgrepo-com.svg";
import mailSymbol from "/contact-letter-box-svgrepo-com.svg";
import linkedInSymbol from "/linkedin-linked-in-svgrepo-com.svg";

import "../Styles/ToolBar.css";

function ClickableIcon({source, iconScale, positionAry, onClickFunction}){
    return(
        <>
            <Svg
                src={source}
                scale={iconScale}
                position={positionAry}
                onClick={onClickFunction}
            />
            <mesh position={[positionAry[0] + 2.25, positionAry[1] - 3, positionAry[2] - 4]} onClick={onClickFunction}>
                <boxGeometry args={[5, 5, 5]} />
                <meshBasicMaterial transparent={true} opacity={0}/>
            </mesh>
        </>
    );
}

function ToolBar() {
    const [taskBarOpen, setTaskBarOpen] = useState(false);

    const opening = () => setTaskBarOpen(true);
    const closing = () => setTaskBarOpen(false);

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
