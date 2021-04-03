import React from 'react';
import Score from '../../Score/Score.component';
import Animate from '../../Animate/Animate.component';

const Game = React.memo(({ score, scoreUnit, problem }) => {
  return (
    <div className='app game'>
      {problem}
      <Animate>
        <h2 className='score-unit'>{scoreUnit.toFixed(2)}</h2>
        <Score score={score} className='sc1' />
      </Animate>
    </div>
  );
});

Game.displayName = 'Game';

export default Game;
