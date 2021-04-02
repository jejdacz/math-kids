import React, { useEffect } from 'react';
import Score from '../../Score/Score.component';
import { gameStates } from '../store';
import Animate from '../../Animate/Animate.component';

const Game = React.memo(
  ({
    score,
    scoreUnit,
    gameState,
    problem,
    startRound,
    finishRound,
    initRound
  }) => {
    // state transitions

    useEffect(() => {
      if (gameState === gameStates.roundInit) {
        console.log('gamestate - round - init');
        setTimeout(() => startRound(), 500);
      }

      if (gameState === gameStates.roundFail) {
        console.log('gamestate - round - fail');
        setTimeout(() => finishRound(), 2000);
      }

      if (gameState === gameStates.roundSuccess) {
        console.log('gamestate - round - success');
        setTimeout(() => finishRound(), 2000);
      }

      if (gameState === gameStates.roundOver) {
        console.log('gamestate - round - over');
        setTimeout(() => initRound(), 500);
      }
    }, [gameState]);

    return (
      <div className='app game'>
        {problem}
        <h2 className='score-unit'>{scoreUnit.toFixed(2)}</h2>
        <Animate>
          <Score score={score} className='sc1' />
        </Animate>
      </div>
    );
  }
);

Game.displayName = 'Game';

export default Game;
