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
      
      <Suspense fallback={null}>
        <YellowPantsWoman />
      </Suspense>
      <Suspense fallback={null}>
        <PurplePantsWoman />
      </Suspense>
      <Suspense fallback={null}>
        <BrownPantsMan />
      </Suspense>
      <Suspense fallback={null}>
        <BluePantsWoman />
      </Suspense>
    </>
  );
}

export default PeopleSpace;
