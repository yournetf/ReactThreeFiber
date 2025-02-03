import { Canvas } from "@react-three/fiber";
import "./App.css";
import { useRef, useState, createContext, useContext, useEffect, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
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
import LoadingScreen from "./Components/LoadingScreen";
import ToolBar from "./Components/ToolBar";

//Context for dark mode.
export const DarkmodeContext = createContext();

//Context for azimuthal angle.
export const RotationContext = createContext();

//Context to check if city is loaded.
export const LoadedContext = createContext();

function App() {
  //State to check if the components in the canvas have rendered.
  const [isLoading, setIsLoading] = useState(true);

  //State to check if the enter button has been clicked and should be dismissed.
  const [enterClicked, setEnterClicked] = useState(false);

  //State to check if dark mode has been selected.
  const [darkMode, setDarkMode] = useState(false);

  //Stores the rotation of the scene.
  const [azimuthalAngle, setAzimuthalAngle] = useState(0);

  const orbitControlsRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (orbitControlsRef.current) {
        setIsLoading(false);
        console.log("OrbitControls ref is now set:", orbitControlsRef.current);
        clearInterval(interval);
  
        const controls = orbitControlsRef.current;
  
        const updateAzimuthalAngle = () => {
          const angle = controls.getAzimuthalAngle();
          // console.log("Azimuthal Angle Changed:", angle);
          setAzimuthalAngle(angle);
        };
  
        controls.addEventListener("change", updateAzimuthalAngle);
        return () => {
          controls.removeEventListener("change", updateAzimuthalAngle);
        };
      } else {
        // console.log("Waiting for OrbitControls ref...");
      }
    }, 100);
  
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (enterClicked) {
      const controls = orbitControlsRef.current;
      const camera = controls.object; // The camera being controlled
      const targetZoom = 75; // Desired zoom level
  
      let frame;
      const animateZoom = () => {
        frame = requestAnimationFrame(animateZoom);
      
        // Smoothly interpolate the camera's z-position
        camera.position.z += (targetZoom - camera.position.z) * 0.1;
      
        // Adjust the polar angle directly
        const currentPolarAngle = controls.getPolarAngle();
        const targetPolarAngle = Math.PI/2.3; // Example target angle (adjust as needed)
        const newPolarAngle = currentPolarAngle + (targetPolarAngle - currentPolarAngle) * 0.1;
      
        controls.minPolarAngle = newPolarAngle; // Update minPolarAngle
        controls.maxPolarAngle = newPolarAngle; // Lock maxPolarAngle to the same value
      
        controls.update(); // Update the controls
      
        // Stop the animation when the camera is close enough
        if (Math.abs(camera.position.z - targetZoom) < 1 && Math.abs(newPolarAngle - targetPolarAngle) < 0.01) {
          cancelAnimationFrame(frame);
      
          // Restore normal maxDistance and polar angle limits
          controls.maxDistance = 100;
          controls.minPolarAngle = Math.PI / 3; // Reset to your desired default
          controls.maxPolarAngle = Math.PI / 2.2;
        }
      };
      
      animateZoom();
      
  
      return () => cancelAnimationFrame(frame); // Cleanup
    }
  }, [enterClicked]);
  
  

  return (
    <>
    {!enterClicked && (<LoadingScreen enterClicked={enterClicked} setEnterClicked={setEnterClicked} isLoading={isLoading}/> )}
    <DarkmodeContext.Provider value={{ darkMode, setDarkMode }}>
      <RotationContext.Provider value={azimuthalAngle}>
        <div id={enterClicked ? "canvas-container" : "invisible"}>
          <HUD />
          <Canvas
            shadows
            style={{ backgroundColor: "#090924" }}
            camera={{ position: [0, 0, 200] }}
          >

            <OrbitControls
              ref={orbitControlsRef}
              minPolarAngle={Math.PI / 2.8}
              maxPolarAngle={Math.PI / 2.2}
              rotateSpeed={0.15}
              minDistance={60}
              maxDistance={200}
              enablePan={false}
            />

            <MainLight />
            <Floor />
            <CenterPiece />
            <ToolBar/>
          
            <SubLight />
            
            
            <TreeSpace />
            <FlowerSpace />
            <GrassSpace />
            <PicnicSpace />
            <InnerSidewalkSpace />
            <PeopleSpace />
            <BenchSpace />
            <AnimalSpace />
            <Taxi />
            <Stars />
          </Canvas>
        </div>
      </RotationContext.Provider>
    </DarkmodeContext.Provider>
  
    </>
    
    
  );
}

export default App;
