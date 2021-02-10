import React, { useEffect, useRef } from 'react';
import Score from '../../Score/Score.component';
import { TweenLite } from 'gsap';
import { roundStates } from '../store';

const Game = React.memo(
  ({
    score,
    scoreUnit,
    roundState,
    gameState,
    problem,
    startRound,
    finishRound
  }) => {
    const heading = useRef(null);

    console.log('game rerender');
    // TweenLite test

    useEffect(() => {
      TweenLite.to(heading.current, 5, {
        transform: 'scale(0.5)',
        onComplete: message => console.log(message),
        onCompleteParams: ['hello tween']
      });
    }, [gameState]);

    // round state transitions

    useEffect(() => {
      if (roundState === roundStates.init) {
        console.log('roundstate - init');
        // setScoreUnit(initScoreUnit);
        // stopCountdown();
        // setProblemSpec(createProblem(problemOptions));
        setTimeout(() => startRound(), 1000);
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
        setTimeout(() => finishRound(), 3000);
        // stopCountdown();
      }

      if (roundState === roundStates.fail) {
        console.log('roundstate - fail');
        // setTimeout(() => setRoundState(roundStates.over), 1000);
      }

      if (roundState === roundStates.success) {
        console.log('roundstate - success');
        // setTimeout(() => setRoundState(roundStates.over), 1000);
      }

      if (roundState === roundStates.over) {
        console.log('roundstate - over');
        // onRoundOver(() => setRoundState(roundStates.init));
      }
    }, [roundState]);

    return (
      <div className='app game'>
        <h1 ref={heading} className='main-title'>
          MATH KIDS
        </h1>
        {problem}
        <h2 className='score-unit'>{scoreUnit.toFixed(2)}</h2>
        <Score score={score} />
      </div>
    );
  }
);

Game.displayName = 'Game';

export default Game;
