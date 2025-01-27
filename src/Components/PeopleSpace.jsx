import React, { Suspense, lazy } from 'react';
import BluePantsMan from "./BluePantsMan";

// Lazy load components
const YellowPantsWoman = lazy(() => import('./YellowPantsWoman'));
const PurplePantsWoman = lazy(() => import('./PurplePantsWoman'));
const BrownPantsMan = lazy(() => import('./BrownPantsMan'));
const BluePantsWoman = lazy(() => import('./BluePantsWoman'));

function PeopleSpace() {
  return (
    <>
      <BluePantsMan />
      
      <Suspense fallback={<></>}>
        <YellowPantsWoman />
      </Suspense>
      <Suspense fallback={<></>}>
        <PurplePantsWoman />
      </Suspense>
      <Suspense fallback={<></>}>
        <BrownPantsMan />
      </Suspense>
      <Suspense fallback={<></>}>
        <BluePantsWoman />
      </Suspense>
    </>
  );
}

export default PeopleSpace;
