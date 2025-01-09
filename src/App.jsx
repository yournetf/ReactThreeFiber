import { Canvas } from '@react-three/fiber';
import './App.css'
import AnimatedBox from './Components/AnimatedBox';
import { GizmoHelper, GizmoViewcube, OrbitControls } from '@react-three/drei';

function App() {

  return (
    <>
      <div id='canvas-container'>
        <Canvas style={{backgroundColor: 'deepskyblue'}}>
          <GizmoHelper>
            <GizmoViewcube/>
          </GizmoHelper>
          <OrbitControls/>
          <axesHelper args={[20]}/>
          <gridHelper args={[100, 50]}/>
          <mesh>
            <torusKnotGeometry args={[1.3, 0.3, 256, 256]}/>
            <meshToonMaterial color={"gold"}/>
            <directionalLight position={[2, 5, 2]}/>
          </mesh>
          <AnimatedBox/>
        </Canvas>
      </div>
    </>
  )
}

export default App
