import { Canvas } from '@react-three/fiber';
import './App.css'
import AnimatedBox from './Components/AnimatedBox';
import { FirstPersonControls } from '@react-three/drei';

function App() {

  return (
    <>
      <div id='canvas-container'>
        <Canvas style={{backgroundColor: 'deepskyblue'}}>
          <FirstPersonControls movementSpeed={20} />
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
