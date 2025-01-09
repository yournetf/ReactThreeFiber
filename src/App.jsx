import { Canvas } from '@react-three/fiber';
import './App.css'
import AnimatedBox from './Components/AnimatedBox';

function App() {

  return (
    <>
      <div id='canvas-container'>
        <Canvas style={{backgroundColor: 'deepskyblue'}}>
          <mesh>
            <torusKnotGeometry args={[1.3, 0.3, 256, 256]} scale={0.2, 1, 1}/>
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
