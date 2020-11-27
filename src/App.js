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
    setScore(score + scoreUnit);
    handleRoundEnd();
    setRoundState(roundStates.success);
  };

  const handleFail = () => {
    handleRoundEnd();
    setRoundState(roundStates.fail);
  };

  const handleRoundEnd = () => {
    setRoundState(roundStates.over);
    round + 1 > rounds
      ? setTimeout(() => setAppState(appStates.over), 1000)
      : setTimeout(() => setRoundState(roundStates.init), 1000);
  };

  const handleStart = () => {
    setScore(0);
    setRound(0);
    setAppState(appStates.game);
    setRoundState(roundStates.init);
  };

  /*
  const newRound = () => {
    if (round + 1 < rounds) {
      setRoundState(roundStates.init);
      setRound(round + 1);
      setProblemSpec(createProblem(problemOptions));
      setTimeout(() => setRoundState(roundStates.running), 1000);
    } else {
      setAppState(appStates.over);
    }
  };*/

  const newRound = () => {
    console.log('preparing new round');
    setRound(round => round + 1);
    setProblemSpec(createProblem(problemOptions));
    setTimeout(() => setRoundState(roundStates.running), 1000);
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
      <div className='app'>
        <h1 className='main-title'>MATH KIDS</h1>
        {roundState === roundStates.success && (
          <p className='success'>great job!</p>
        )}
        {roundState === roundStates.fail && <p className='fail'>nextime!</p>}
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
    );
  };

  const renderOver = () => (
    <div className='app'>
      <h1 className='main-title'>MATH KIDS</h1>
      <div className='score-container'>
        <h2 className='score'>{score.toFixed(1)}</h2>
        <h2 className='score-title'>score</h2>
      </div>
      <CustomButton onClick={handleStart} className='button-start'>
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
      <p className='get-ready'>...get ready</p>
    </div>
  );

  switch (appState) {
    case appStates.intro:
      return <Fragment>{renderIntro()}</Fragment>;
    case appStates.game:
      return (
        <Fragment>
          {problemSpec && roundState !== roundStates.init
            ? renderGame()
            : renderGetReady()}
        </Fragment>
      );
    case appStates.over:
      return <Fragment>{renderOver()}</Fragment>;
    default:
      return <Fragment>{renderError()}</Fragment>;
  }
};

export default App;
