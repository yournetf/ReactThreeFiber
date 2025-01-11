import { Canvas } from '@react-three/fiber';
import './App.css'
import AnimatedBox from './Components/AnimatedBox';
import { GizmoHelper, GizmoViewcube, OrbitControls, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import LBuilding from './Components/LBuilding';
import Stars from './Components/Stars';
import Planet from './Components/Planet';
import Floor from './Components/Floor';
import MainLight from './Components/MainLight';
import TreeSpace from './Components/TreeSpace';

function App() {

  return (
    <>
      <div id='canvas-container'>
        <Canvas 
          shadows
          style={{backgroundColor: '#090924'}}
          camera={{position: [0, 0, 100]}}
        >

          <MainLight/>
          <TreeSpace/>
          <Floor/>

          <GizmoHelper>
            <GizmoViewcube/>
          </GizmoHelper>

          <OrbitControls
            minPolarAngle={Math.PI / 2.5} 
            maxPolarAngle={Math.PI / 2.5} 
            rotateSpeed={0.25}
            minDistance={30}
            maxDistance={100}
            enablePan={false}
          />

          <axesHelper args={[20]} />
          <gridHelper args={[100, 50]}/>

          {/* <mesh castShadow position={[1, 1, 1]}>
            <torusKnotGeometry args={[1.3, 0.3, 256, 256]}/>
            <meshToonMaterial color={"black"}/>
          </mesh> */}

          {/* <AnimatedBox/> */}

          {/* <LBuilding/> */}
          <Stars/>
          {/* <Planet/> */}
        </Canvas>
      </div>
    </>
  )
}

export default App
