import React, { useState, useEffect } from 'react';
import Game from './AppStates/Game.appState';
import Over from './AppStates/Over.appState';
import Intro from './AppStates/Intro.appSate';
import Error from './AppStates/Error.appSate';
import Problem from '../Problem/Problem.component';
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

const App = () => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    return () => {
      unsubscribe();
    };
  }, []);

  const { score, scoreUnit, roundState, gameState, problemSpec } = state;

  const buttonsEnabled = roundState === roundStates.running;

  const problem = (
    <Problem
      {...{ buttonsEnabled, problemSpec, stopRound, checkAnswer, finishRound }}
    />
  );

  const renderContent = () => {
    switch (state.gameState) {
      case gameStates.intro:
        return <Intro {...{ startGame }} />;
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
          />
        );
      case gameStates.over:
        return <Over {...{ restartGame, score }} />;
      default:
        return <Error {...{ startGame }} />;
    }
  };

  return renderContent();
};

export default App;
