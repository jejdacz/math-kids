import React from 'react';
import MenuButton from '../../MenuButton/MenuButton.component';
import Score from '../../Score/Score.component';
import Particles from 'react-particles-js';
import particlesConfig from '../particlesjs-config.json';

const Over = React.memo(({ score, restartGame }) => {
  return (
    <div className='app over'>
      <Particles
        style={{ position: 'absolute', left: '0', top: '0' }}
        params={particlesConfig}
      />
      <Score className='large' score={score} />
      <MenuButton onClick={restartGame} className='button-restart'>
        RESTART
      </MenuButton>
    </div>
  );
});

export default Over;
