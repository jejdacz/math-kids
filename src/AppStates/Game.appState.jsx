import React, { useState, useEffect, useRef } from 'react';
import Problem from '../components/Problem/Problem.component';
import Round from '../components/Round/Round.component';
import Score from '../components/Score/Score.component';
import { TweenLite } from 'gsap';

import createProblem from '../createProblem';

const Game = ({
  handleGameOver,
  problemOptions = { answersCount: 4 },
  rounds = 1
}) => {
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [problemSpec, setProblemSpec] = useState(createProblem(problemOptions));

  const heading = useRef(null);

  const onSuccess = scoreUnit => {
    console.log('game - on success');
    setScore(score + scoreUnit);
  };

  const onRoundOver = restart => {
    console.log('game - on round over');
    round + 1 > rounds
      ? setTimeout(() => handleGameOver({ score }), 1000)
      : roundRestart(restart);
  };

  const roundRestart = restart => {
    console.log('preparing new round');
    setRound(round => round + 1);
    setProblemSpec(createProblem(problemOptions));
    restart();
  };

  useEffect(() => {
    TweenLite.to(heading.current, 1.5, { transform: 'scale(0.5)' });
  });

  return (
    <div className='app game'>
      <h1 ref={heading} className='main-title'>
        MATH KIDS
      </h1>
      <Round
        {...{ onSuccess, onRoundOver }}
        render={({ scoreUnit, handleSuccess, handleFail }) => (
          <>
            <Problem
              {...{
                handleSuccess,
                handleFail,
                problemSpec
              }}
            />
            <h2 className='score-unit'>{scoreUnit.toFixed(2)}</h2>
            <Score score={score} />
          </>
        )}
      />
    </div>
  );
};

export default Game;
