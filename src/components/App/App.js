import React, { useState, useEffect } from 'react';
import Game from './AppStates/Game.appState';
import Over from './AppStates/Over.appState';
import Intro from './AppStates/Intro.appSate';
import Error from './AppStates/Error.appSate';
import Problem from '../Problem/Problem.component';
import { scenes } from './Animation';
import { Animate, AnimateContext } from '../Animate/Animate.component';
import {
  store,
  gameStates,
  startGame,
  restartGame,
  startRound,
  stopRound,
  finishRound,
  initRound,
  checkAnswer,
  roundStates
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

  const { score, scoreUnit, roundState, gameState, problemSpec } = state;

  // child parameter
  useEffect(() => {
    if (roundState === roundStates.init) {
      setAnimateState(scenes.introLoading);
    }
    if (roundState === roundStates.stopped) {
      setAnimateState(scenes.introLoading);
    }
  }, [roundState]);

  // parent parameter
  useEffect(() => {
    if (gameState === gameStates.intro) {
      setAnimateState(scenes.introLoading);
    }
  }, [gameState]);

  const buttonsEnabled = roundState === roundStates.running;

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
      case gameStates.game:
        return (
          <Game
            score={score}
            scoreUnit={scoreUnit}
            roundState={roundState}
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
