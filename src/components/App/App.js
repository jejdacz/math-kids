import React, { useContext, useState, useEffect } from 'react';
import Game from './AppStates/Game.appState';
import Over from './AppStates/Over.appState';
import Intro from './AppStates/Intro.appSate';
import Error from './AppStates/Error.appSate';
import Problem from '../Problem/Problem.component';
import {
  store,
  gameStates,
  startGame,
  startRound,
  finishRound,
  pickAnswer,
  roundStates
} from './store';

import './App.scss';

/* context */

export const AppContext = React.createContext();

export const useAppContext = map => {
  const value = useContext(AppContext);
  return map(value);
};

export const withAppContext = map => Comp => props => {
  const context = map(useContext(AppContext));
  const mappedContext = map(context);
  return <Comp {...{ ...props, ...mappedContext }} />;
};

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

  const buttonsActive = roundState === roundStates.running;

  const problem = <Problem {...{ buttonsActive, problemSpec, pickAnswer }} />;

  console.log('app rerender');

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
          />
        );
      case gameStates.over:
        return <Over {...{ startGame, score }} />;
      default:
        return <Error {...{ startGame }} />;
    }
  };

  return renderContent();
};

export default App;
