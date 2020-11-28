import React, { useState, useEffect, Fragment } from 'react';
import Game from './AppStates/Game.appState';
import Over from './AppStates/Over.appState';
import Intro from './AppStates/Intro.appSate';
import Error from './AppStates/Error.appSate';

import './App.scss';

export const appStates = Object.freeze({
  intro: 'intro',
  game: 'game',
  over: 'over'
});

const App = () => {
  const [appState, setAppState] = useState(appStates.intro);
  const [gameResult, setGameResult] = useState({});

  const handleGameOver = result => {
    setGameResult(result);
    setAppState(appStates.over);
  };

  const handleGameStart = () => {
    setAppState(appStates.game);
  };

  const renderContent = () => {
    switch (appState) {
      case appStates.intro:
        return <Intro {...{ handleGameStart }} />;
      case appStates.game:
        return <Game {...{ handleGameOver }} />;
      //return <h1>game</h1>;
      case appStates.over:
        return <Over {...{ handleGameStart, gameResult }} />;
      default:
        return <Error {...{ handleGameStart }} />;
    }
  };

  return renderContent();
};

export default App;
