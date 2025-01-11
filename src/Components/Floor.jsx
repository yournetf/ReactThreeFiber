

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

            


        </>
    );
}
export default Floor;