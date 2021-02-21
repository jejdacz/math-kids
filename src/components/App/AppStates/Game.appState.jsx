import React, { useEffect, useRef } from 'react';
import Score from '../../Score/Score.component';
import { TweenLite } from 'gsap';
import { gameStates, roundStates } from '../store';

const Game = React.memo(
  ({
    score,
    scoreUnit,
    roundState,
    gameState,
    problem,
    startRound,
    finishRound,
    initRound
  }) => {
    const heading = useRef(null);

    // TweenLite test

    useEffect(() => {
      TweenLite.to(heading.current, 5, {
        transform: 'scale(0.85)'
      });
    }, [gameState]);

    // round state transitions

    useEffect(() => {
      if (roundState === roundStates.init) {
        console.log('roundstate - init');
        // setScoreUnit(initScoreUnit);
        // stopCountdown();
        // setProblemSpec(createProblem(problemOptions));
        setTimeout(() => startRound(), 500);
      }

      if (roundState === roundStates.loading) {
        console.log('roundstate - loading');
        // setTimeout(() => setRoundState(roundStates.running), 1000);
      }

      if (roundState === roundStates.running) {
        console.log('roundstate - running');
        // startCountdown();
      }

      if (roundState === roundStates.answerPicked) {
        console.log('roundstate - answer picked');
        //setTimeout(() => finishRound(), 3000);
        // stopCountdown();
      }

      if (roundState === roundStates.fail) {
        console.log('roundstate - fail');
        setTimeout(() => finishRound(), 1000);
        // setTimeout(() => setRoundState(roundStates.over), 1000);
      }

      if (roundState === roundStates.success) {
        console.log('roundstate - success');
        setTimeout(() => finishRound(), 2000);
        // setTimeout(() => setRoundState(roundStates.over), 1000);
      }

      if (roundState === roundStates.over && gameState === gameStates.game) {
        console.log('roundstate - over');
        setTimeout(() => initRound(), 500);
      }
    }, [roundState, gameState]);

    return (
      <div className='app game'>
        {problem}
        <h2 className='score-unit'>{scoreUnit.toFixed(2)}</h2>
        <Score score={score} />
      </div>
    );
  }
);

Game.displayName = 'Game';

export default Game;
