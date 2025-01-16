import { Canvas } from '@react-three/fiber';
import './App.css'
import AnimatedBox from './Components/AnimatedBox';
import { Center, GizmoHelper, GizmoViewcube, OrbitControls, useHelper } from '@react-three/drei';
import { useRef, useContext, useState, createContext } from 'react';
import Taxi from './Components/Taxi';
import Stars from './Components/Stars';
import Planet from './Components/Planet';
import Floor from './Components/Floor';
import MainLight from './Components/MainLight';
import SubLight from './Components/SubLight';
import TreeSpace from './Components/TreeSpace';
import FlowerSpace from './Components/FlowerSpace';
import GrassSpace from './Components/GrassSpace';
import CenterPiece from './Components/CenterPiece';
import PicnicSpace from './Components/PicnicSpace';
import InnerSidewalkSpace from './Components/InnerSidewalkSpace';
import PeopleSpace from './Components/PeopleSpace';
import HUD from './Components/HUD';
import BenchSpace from './Components/BenchSpace';

export const DarkmodeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <>
    <DarkmodeContext.Provider value={{darkMode, setDarkMode}}>
      <div id='canvas-container'>
        <HUD/>
        <Canvas 
          shadows
          style={{backgroundColor: '#090924'}}
          camera={{position: [0, 0, 100]}}
        >

          <MainLight/>
          <SubLight/>
          <Floor/>
          <CenterPiece/>
          <TreeSpace/>
          <FlowerSpace/>
          <GrassSpace/>
          <PicnicSpace/>
          <InnerSidewalkSpace/>
          <PeopleSpace/>
          <BenchSpace/>

          <GizmoHelper>
            <GizmoViewcube/>
          </GizmoHelper>

          <OrbitControls
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 2.3} 
            rotateSpeed={0.25}
            minDistance={60}
            maxDistance={100}
            enablePan={false}
          />

          {/* <axesHelper args={[20]} />
          <gridHelper args={[100, 50]}/> */}

          {/* <mesh castShadow position={[1, 1, 1]}>
            <torusKnotGeometry args={[1.3, 0.3, 256, 256]}/>
            <meshToonMaterial color={"black"}/>
          </mesh> */}

          {/* <AnimatedBox/> */}

          <Taxi/>
          <Stars/>
          {/* <Planet/> */}
        </Canvas>
      </div>
    </DarkmodeContext.Provider>
            
    </>
  )
}

export default App
