import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import YellowPantsWoman from "./YellowPantsWoman";
import PurplePantsWoman from "./PurplePantsWoman";
import BrownPantsMan from "./BrownPantsMan";
import BluePantsWoman from "./BluePantsWoman";

function PeopleSpace(){

    return(
        <>
            <YellowPantsWoman/>
            <PurplePantsWoman/>
            <BrownPantsMan/>
            <BluePantsWoman/>
        </>
    );
}
export default PeopleSpace;