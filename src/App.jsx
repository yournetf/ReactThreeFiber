import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useRef, useState, createContext, useContext, useEffect } from "react";
import { OrbitControls, GizmoHelper, GizmoViewcube } from "@react-three/drei";
import HUD from "./Components/HUD";
import MainLight from "./Components/MainLight";
import SubLight from "./Components/SubLight";
import Floor from "./Components/Floor";
import CenterPiece from "./Components/CenterPiece";
import TreeSpace from "./Components/TreeSpace";
import FlowerSpace from "./Components/FlowerSpace";
import GrassSpace from "./Components/GrassSpace";
import PicnicSpace from "./Components/PicnicSpace";
import InnerSidewalkSpace from "./Components/InnerSidewalkSpace";
import PeopleSpace from "./Components/PeopleSpace";
import BenchSpace from "./Components/BenchSpace";
import AnimalSpace from "./Components/AnimalSpace";
import Taxi from "./Components/Taxi";
import Stars from "./Components/Stars";

//Context for dark mode.
export const DarkmodeContext = createContext();

//Context for azimuthal angle.
export const RotationContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);

  //Stores the rotation of the scene.
  const [azimuthalAngle, setAzimuthalAngle] = useState(0);

  const orbitControlsRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (orbitControlsRef.current) {
        console.log("OrbitControls ref is now set:", orbitControlsRef.current);
        clearInterval(interval);
  
        const controls = orbitControlsRef.current;
  
        const updateAzimuthalAngle = () => {
          const angle = controls.getAzimuthalAngle();
          console.log("Azimuthal Angle Changed:", angle);
          setAzimuthalAngle(angle);
        };
  
        controls.addEventListener("change", updateAzimuthalAngle);
  
        return () => {
          controls.removeEventListener("change", updateAzimuthalAngle);
        };
      } else {
        console.log("Waiting for OrbitControls ref...");
      }
    }, 100);
  
    return () => clearInterval(interval);
  }, []);

  //Checks to see how much the page has rotated.
  // useEffect(()=> {
  //   console.log(azimuthalAngle);
  // }, [azimuthalAngle]);

  

  return (
    <DarkmodeContext.Provider value={{ darkMode, setDarkMode }}>
      <RotationContext.Provider value={azimuthalAngle}>
        <div id="canvas-container">
          <HUD />
          <Canvas
            shadows
            style={{ backgroundColor: "#090924" }}
            camera={{ position: [0, 0, 100] }}
          >
            <MainLight />
            <SubLight />
            <Floor />
            <CenterPiece />
            <TreeSpace />
            <FlowerSpace />
            <GrassSpace />
            <PicnicSpace />
            <InnerSidewalkSpace />
            <PeopleSpace />
            <BenchSpace />
            <AnimalSpace />

            <GizmoHelper>
              <GizmoViewcube />
            </GizmoHelper>

            <OrbitControls
              ref={orbitControlsRef}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2.3}
              rotateSpeed={0.25}
              minDistance={60}
              maxDistance={100}
              enablePan={false}
            />

            <Taxi />
            <Stars />
          </Canvas>
        </div>
      </RotationContext.Provider>
    </DarkmodeContext.Provider>
  );
}

export default App;
