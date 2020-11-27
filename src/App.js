import React, { useState, useEffect, Fragment } from 'react';
import Problem from './components/Problem/Problem.component';
import CustomButton from './components/CustomButton/CustomButton.component';
import Round from './components/Round/Round.component';
//import Score from './components/Score/Score.component';

import createProblem from './createProblem';

import './App.scss';

export const appStates = Object.freeze({ intro: 0, game: 1, over: 3 });
export const roundStates = Object.freeze({
  init: 0,
  running: 1,
  over: 2,
  success: 3,
  fail: 4
});

const App = ({ problemOptions = { answersCount: 4 }, rounds = 5 }) => {
  const [appState, setAppState] = useState(appStates.intro);
  const [score, setScore] = useState();
  const [round, setRound] = useState();
  const [roundState, setRoundState] = useState();
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
    round + 1 > rounds
      ? setAppState(appStates.over)
      : setRoundState(roundStates.init);
  };

  const handleStart = () => {
    setScore(0);
    setRound(0);
    setAppState(appStates.game);
    setRoundState(roundStates.init);
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
    <div className='app intro'>
      <h1 className='main-title'>MATH KIDS</h1>
      <CustomButton onClick={handleStart} className='button-start'>
        START
      </CustomButton>
    </div>
  );

  const renderGame = () => {
    return (
      <Fragment>
        <div className='app'>
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
                <div className='score-container'>
                  <h2 className='score'>{score.toFixed(1)}</h2>
                  <h2 className='score-title'>score</h2>
                  <h2 className='score-unit'>{scoreUnit.toFixed(2)}</h2>
                </div>
              </Fragment>
            )}
          />
        </div>
        {roundState !== roundStates.running && <div className='freeze'></div>}
      </Fragment>
    );
  };

  const renderOver = () => (
    <div className='app'>
      <h1 className='main-title'>MATH KIDS</h1>
      <div className='score-container'>
        <h2 className='score'>{score.toFixed(1)}</h2>
        <h2 className='score-title'>score</h2>
      </div>
      <CustomButton onClick={handleStart} className='button-restart'>
        RESTART
      </CustomButton>
    </div>
  );

  const renderError = () => (
    <div className='app'>
      <h1 className='main-title'>MATH KIDS</h1>
      <p className='error'>Something bad happened!</p>
      <CustomButton onClick={handleStart} className='button-start'>
        RESTART
      </CustomButton>
    </div>
  );

  const renderGetReady = () => (
    <div className='app'>
      <h1 className='main-title'>MATH KIDS</h1>
    </div>
  );

  switch (appState) {
    case appStates.intro:
      return <Fragment>{renderIntro()}</Fragment>;
    case appStates.game:
      return (
        <Fragment>{problemSpec ? renderGame() : renderGetReady()}</Fragment>
      );
    case appStates.over:
      return <Fragment>{renderOver()}</Fragment>;
    default:
      return <Fragment>{renderError()}</Fragment>;
  }
};

export default App;
