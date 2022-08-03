import React from 'react';
import MemberComponent from './MemberComponent.js';

const MainComponent = ({modalOpenFn}) => {
  return (
    <main id="main">
      <MemberComponent modalOpenFn={modalOpenFn}/>
    </main>
  );
};

export default MainComponent;