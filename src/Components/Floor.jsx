

function Floor(){
    return(
        <>
            {/* Grass */}
            <mesh rotation={[-Math.PI / 2, 0 , 0]} receiveShadow>
                <ringGeometry args={[45, 50, 200]}/>
                <meshStandardMaterial color={'#317d20'}/>
            </mesh>

            {/* SideWalkOuter */}
            <mesh rotation={[-Math.PI / 2, 0 , 0]} position={[0, 0.1, 0]} receiveShadow >
                <ringGeometry args={[40, 45, 200]}/>
                <meshStandardMaterial color={'#d6d1c7'}/>
            </mesh>
            
            {/* Road */}
            <mesh rotation={[-Math.PI / 2, 0 , 0]} receiveShadow>
                <ringGeometry args={[30, 40, 200]}/>
                <meshStandardMaterial color={'#4d4d4d'}/>
            </mesh>

            {/* SideWalkInner */}
            <mesh rotation={[-Math.PI / 2, 0 , 0]} position={[0, 0.1, 0]} receiveShadow>
                <ringGeometry args={[25, 30, 200]}/>
                <meshStandardMaterial color={'#d6d1c7'}/>
            </mesh>

            {/* Hill */}
            <mesh rotation={[-Math.PI, 0, 0]} position={[0, -20, 0]} scale={[1, 1, 1]} receiveShadow>
                <sphereGeometry args={[32, 64, 32, 10, 8, 2, 2]}/>
                <meshStandardMaterial/>
            </mesh>


        </>
    );
}
export default Floor;