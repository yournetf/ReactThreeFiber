import { Canvas } from '@react-three/fiber';
import './App.css'

function App() {

  return (
    <>
      <div id='canvas-container'>
        <Canvas camera={{position: [2, 2, 2]}} style={{backgroundColor: 'deepskyblue'}}>
          <mesh>
            <torusKnotGeometry args={[1.7, 0.3, 256, 256]}/>
            <meshToonMaterial color={"gold"}/>
            <directionalLight position={[2, 5, 1]}/>
          </mesh>
        </Canvas>
      </div>
    </>
  )
}

export default App
