import { Svg } from "@react-three/drei";
import { useState } from "react";
import { useCursor } from "@react-three/drei";
import minusSymbol from "/minus-square-svgrepo-com.svg";
import plusSymbol from "/plus-square-svgrepo-com.svg";
import githubSymbol from "/github-svgrepo-com.svg";
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
                <Svg src={minusSymbol} scale={0.15} position={[0, 0, 50]} onClick={closing} onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}/>

                {/* GitHub Link */}
                <Svg
                    src={githubSymbol}
                    scale={0.15}
                    position={[6, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={githubSymbol}
                    scale={0.15}
                    position={[11.5, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={githubSymbol}
                    scale={0.15}
                    position={[17, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={githubSymbol}
                    scale={0.15}
                    position={[-6, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={githubSymbol}
                    scale={0.15}
                    position={[-11.5, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />

                <Svg
                    src={githubSymbol}
                    scale={0.15}
                    position={[-17, 0, 50]}
                    onClick={() => window.open("https://github.com", "_blank")}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                />
                </>
            ) : (
                <Svg src={plusSymbol} scale={0.15} position={[0, 0, 50]} onClick={opening} onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}/>
            )}

            
        </>
    );
}

export default ToolBar;
