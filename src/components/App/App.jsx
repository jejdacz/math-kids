import React, { useState, useEffect } from 'react';
import Game from './AppStates/Game.appState';
import Over from './AppStates/Over.appState';
import Intro from './AppStates/Intro.appSate';
import Error from './AppStates/Error.appSate';
import Problem from '../Problem/Problem.component';
import scenes from './scenes';
import useScenes from './useScenes';
import { AnimateContext } from '../Animate/Animate.component';
import {
  store,
  appStates,
  startGame,
  restartGame,
  startRound,
  finishRound,
  initRound,
  checkAnswer
} from './store';

import './App.scss';

/*** App component ***/

const App = () => {
  const [state, setState] = useState(store.getState());
  const [scene, setScene, playScene] = useScenes(scenes);
  const [selectedButton, setSelectedButton] = useState();

  // subscribe to store
  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.getState()));
    return () => {
      unsubscribe();
    };
  }, []);

  const { score, scoreUnit, appState, problemSpec } = state;

  useEffect(() => {
    switch (scene) {
      case scenes.introGameStarting:
        playScene(startGame);
        break;
      case scenes.roundLoading:
        playScene(startRound);
        break;
      case scenes.roundSuccess:
        playScene(() => setScene(scenes.roundCleanup));
        break;
      case scenes.roundFail:
        playScene(() => setScene(scenes.roundCleanup));
        break;
      case scenes.roundCleanup:
        playScene(finishRound);
        break;
      case scenes.overGameRestarting:
        playScene(restartGame);
        break;
      default:
    }
  }, [scene]);

  useEffect(() => {
    switch (appState) {
      case appStates.intro:
        setScene(scenes.introLoading);
        break;
      case appStates.roundInit:
        setSelectedButton();
        setScene(scenes.roundLoading);
        break;
      case appStates.roundSuccess:
        setScene(scenes.roundSuccess);
        break;
      case appStates.roundFail:
        setScene(scenes.roundFail);
        break;
      case appStates.roundOver:
        initRound();
        break;
      case appStates.over:
        setScene(scenes.over);
        break;
      default:
    }
  }, [appState]);

  // buttons enabled only when game is running
  const buttonsEnabled = appState === appStates.roundRunning;

  const handleAnswer = answer => e => {
    if (buttonsEnabled) {
      setSelectedButton(answer.index);
      checkAnswer(answer);
    }
  };

  const handleStartGame = () => {
    setScene(scenes.introGameStarting);
  };

  const handleRestartGame = () => {
    setScene(scenes.overGameRestarting);
  };

  const problem = (
    <Problem
      {...{
        problemSpec,
        selectedButton
      }}
      checkAnswer={handleAnswer}
    />
  );

  const renderContent = () => {
    switch (appState) {
      case appStates.intro:
        return <Intro startGame={handleStartGame} />;
      case appStates.roundInit:
      case appStates.roundRunning:
      case appStates.roundSuccess:
      case appStates.roundFail:
      case appStates.roundOver:
        return <Game {...{ score, scoreUnit, problem }} />;
      case appStates.over:
        return <Over restartGame={handleRestartGame} {...{ score }} />;
      default:
        return <Error {...{ startGame }} />;
    }
  };

  return (
    <AnimateContext.Provider value={scene}>
      {renderContent()}
    </AnimateContext.Provider>
  );
};

export default App;
