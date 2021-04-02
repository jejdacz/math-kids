import React from 'react';
import MenuButton from '../../MenuButton/MenuButton.component';
import Particles from 'react-particles-js';
import particlesConfig from '../particlesjs-config.json';
import Animate from '../../Animate/Animate.component';

const Intro = React.memo(({ startGame }) => {
  return (
    <div className='app intro'>
      <Particles params={particlesConfig} />
      <Animate>
        <h1 className='main-title'>MATH KIDS</h1>
        <MenuButton onClick={startGame} className='button-start'>
          START
        </MenuButton>
      </Animate>
    </div>
  );
});

Intro.displayName = 'Intro';

export default Intro;
