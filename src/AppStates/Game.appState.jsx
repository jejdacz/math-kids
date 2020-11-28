import React, { useState, useEffect, Fragment } from 'react';
import Problem from '../components/Problem/Problem.component';
import Round from '../components/Round/Round.component';
import Score from '../components/Score/Score.component';

import createProblem from '../createProblem';

export const roundStates = Object.freeze({
  init: 'init',
  running: 'running',
  over: 'over',
  success: 'success',
  fail: 'fail'
});

const Game = ({
  handleGameOver,
  problemOptions = { answersCount: 4 },
  rounds = 5
}) => {
  // make Component
  // props: rounds = 5, grade = 3, changeAppState({score,rightansw})
  // handle: handleOver, handleStart, handleRoundFinished, newRound
  // state:  problemSpec, round, score, roundState

  // handleSuccess + handleFail move to Round comp.

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [roundState, setRoundState] = useState(roundStates.init);
  const [problemSpec, setProblemSpec] = useState(createProblem(problemOptions));

  const handleSuccess = scoreUnit => () => {
    console.log('success');
    setScore(score + scoreUnit);
    handleRoundEnd();
  };

  const handleFail = () => {
    console.log('fail');
    handleRoundEnd();
  };

  const handleRoundEnd = () => {
    setRoundState(roundStates.over);
    round + 1 > rounds ? handleGameOver({ score }) : handleOver();
  };

  const handleOver = () => {
    //setProblemSpec();
    setRoundState(roundStates.init);
  };

  const newRound = () => {
    setRoundState(roundStates.running);
    console.log('preparing new round');
    setRound(round => round + 1);
    setProblemSpec(createProblem(problemOptions));
  };

  useEffect(() => {
    if (roundState === roundStates.init) {
      newRound();
    }
  }, [roundState]);

  return (
    <div className='app game'>
      <h1 className='main-title'>MATH KIDS</h1>
      <Round
        roundState={roundState}
        render={({ scoreUnit }) => (
          <Fragment>
            <Problem
              {...{
                handleSuccess: handleSuccess(scoreUnit),
                handleFail,
                problemSpec
              }}
            />
            <h2 className='score-unit'>{scoreUnit.toFixed(2)}</h2>
            <Score score={score} />
          </Fragment>
        )}
      />
    </div>
  );
};

export default Game;
