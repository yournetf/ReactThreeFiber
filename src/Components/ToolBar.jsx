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

function ToolBar() {
    const [taskBarOpen, setTaskBarOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

    const opening = () => setTaskBarOpen(true);
    const closing = () => setTaskBarOpen(false);

    useCursor(hovered); // Change cursor when hovering over the GitHub icon

    return (
        <>
            {/* ToolBar */}
            {taskBarOpen ? (
                <>
                <Svg src={minusSymbol} scale={0.15} position={[-2.25, 0, 50]} onClick={closing} onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}/>

                {/* GitHub Link */}
                <Svg
                    src={githubSymbol}
                    scale={0.15}
                    position={[3.75, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={resumeSymbol}
                    scale={0.08}
                    position={[9.75, 0, 50]}
                    onClick={() => window.open("/Frank_Yournet_Resume.pdf", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={certificationSymbol}
                    scale={0.2}
                    position={[15.25, 0, 50]}
                    onClick={() => window.open("AWS_Course_Completion_Certificate.pdf", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={linkedInSymbol}
                    scale={0.15}
                    position={[-8.25, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={appSymbol}
                    scale={0.005}
                    position={[-13.75, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={mailSymbol}
                    scale={0.08}
                    position={[-19.25, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />
                </>
            ) : (
                <Svg src={plusSymbol} scale={0.15} position={[-2.25, 0, 50]} onClick={opening} onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}/>
            )}

            
        </>
    );
}

export default ToolBar;
