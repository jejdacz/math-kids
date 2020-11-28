import React, { useState, useEffect, Fragment } from 'react';
import Problem from './components/Problem/Problem.component';
import CustomButton from './components/CustomButton/CustomButton.component';
import Round from './components/Round/Round.component';
import Score from './components/Score/Score.component';

import createProblem from './createProblem';

import './App.scss';

export const appStates = Object.freeze({
  intro: 'intro',
  game: 'game',
  over: 'over'
});
export const roundStates = Object.freeze({
  init: 'init',
  running: 'running',
  over: 'over',
  success: 'success',
  fail: 'fail'
});

const App = ({ problemOptions = { answersCount: 4 }, rounds = 5 }) => {
  const [appState, setAppState] = useState(appStates.intro);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [roundState, setRoundState] = useState(roundStates.init);
  const [problemSpec, setProblemSpec] = useState();

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
    round + 1 > rounds ? handleOver() : setRoundState(roundStates.init);
  };

  const handleStart = () => {
    setScore(0);
    setRound(0);
    setAppState(appStates.game);
    setRoundState(roundStates.init);
  };

  const handleOver = () => {
    setProblemSpec();
    setAppState(appStates.over);
  };

  const newRound = () => {
    console.log('preparing new round');
    setRound(round => round + 1);
    setProblemSpec(createProblem(problemOptions));
    setRoundState(roundStates.running);
  };

  useEffect(() => {
    if (appState === appStates.game && roundState === roundStates.init) {
      newRound();
    }
  }, [appState, roundState]);

  const renderIntro = () => (
    <CustomButton onClick={handleStart} className='button-start'>
      START
    </CustomButton>
  );

  // TODO statemachine

  const renderGame = () => {
    // make Component
    // props: rounds = 5, grade = 3, changeAppState({score,rightansw})
    // handle: handleOver, handleStart, handleRoundFinished, newRound
    // state:  problemSpec, round, score, roundState

    // handleSuccess + handleFail move to Round comp.
    return (
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
    );
  };

  const renderOver = () => (
    <Fragment>
      <Score className='large' score={score} />
      <CustomButton onClick={handleStart} className='button-restart'>
        RESTART
      </CustomButton>
    </Fragment>
  );

  const renderError = () => (
    <Fragment>
      <p className='error'>Something bad happened!</p>
      <CustomButton onClick={handleStart} className='button-start'>
        RESTART
      </CustomButton>
    </Fragment>
  );

  const renderWaiting = () => '';

  const renderContent = () => {
    switch (appState) {
      case appStates.intro:
        return renderIntro();
      case appStates.game:
        return problemSpec ? renderGame() : renderWaiting();
      case appStates.over:
        return renderOver();
      default:
        return renderError();
    }
  };

  return (
    <div className={`app ${appState}`}>
      <h1 className='main-title'>MATH KIDS</h1>
      {renderContent()}
    </div>
  );
};

export default App;
