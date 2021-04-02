import React, { useState, useEffect } from 'react';
import Game from './AppStates/Game.appState';
import Over from './AppStates/Over.appState';
import Intro from './AppStates/Intro.appSate';
import Error from './AppStates/Error.appSate';
import Problem from '../Problem/Problem.component';
import { scenes } from './Animation';
import { AnimateContext } from '../Animate/Animate.component';
import {
  store,
  gameStates,
  startGame,
  restartGame,
  startRound,
  stopRound,
  finishRound,
  initRound,
  checkAnswer
} from './store';

import './App.scss';

/*** App component ***/

const initAnimateState = { score: 'init' };

const App = () => {
  const [state, setState] = useState(store.getState());
  const [animateState, setAnimateState] = useState(initAnimateState);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    return () => {
      unsubscribe();
    };
  }, []);

  const { score, scoreUnit, gameState, problemSpec } = state;

  // set animate scene due to game state
  useEffect(() => {
    if (gameState === gameStates.intro) {
      setAnimateState(scenes.introLoading);
    } else if (gameState === gameStates.roundLoading) {
      //setAnimateState(scenes.roundLoading);
    }
  }, [gameState]);

  const buttonsEnabled = gameState === gameStates.roundRunning;

  const problem = (
    <Problem
      {...{
        buttonsEnabled,
        problemSpec,
        stopRound,
        checkAnswer
      }}
    />
  );

  const handleStartGame = () => {
    setAnimateState(scenes.introGameStarting);
    setTimeout(startGame, scenes.introGameStarting.duration);
  };

  const renderContent = () => {
    switch (state.gameState) {
      case gameStates.intro:
        return <Intro startGame={handleStartGame} />;
      case gameStates.roundInit:
      case gameStates.roundLoading:
      case gameStates.roundReady:
      case gameStates.roundRunning:
      case gameStates.roundStopped:
      case gameStates.roundSuccess:
      case gameStates.roundFail:
      case gameStates.roundOver:
        return (
          <Game
            score={score}
            scoreUnit={scoreUnit}
            gameState={gameState}
            problem={problem}
            startRound={startRound}
            finishRound={finishRound}
            initRound={initRound}
            setAnimateState={setAnimateState}
          />
        );
      case gameStates.over:
        return <Over {...{ restartGame, score }} />;
      default:
        return <Error {...{ startGame }} />;
    }
  };

  return (
    <AnimateContext.Provider value={animateState}>
      {renderContent()}
    </AnimateContext.Provider>
  );
};

export default App;
