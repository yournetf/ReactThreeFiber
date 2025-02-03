import { Svg } from "@react-three/drei";
import minusSymbol from "/minus-square-svgrepo-com.svg"
import plusSymbol from "/plus-square-svgrepo-com.svg"
import { useState } from "react";

function ToolBar(){

    const [taskBarOpen, setTaskBarOpen] = useState(false);
    return(
        <>
            
                {/* ToolBar */}
                {taskBarOpen ? 
                    <Svg src={minusSymbol} scale={0.15} position={[0, 0, 50]} />
                        :
                    <Svg src={plusSymbol} scale={0.15} position={[0, 0, 50]} />
                }
                            
        </>
    );
}
export default ToolBar;