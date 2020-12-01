import React, { useState, useEffect } from 'react';

export const roundStates = Object.freeze({
  init: 'init', // components hidden
  loading: 'loading', // showing components
  ready: 'ready', // components ready
  running: 'running', // timer started
  answerPicked: 'answerPicked', // answer picked, disable buttons
  showingRightAnswer: 'showingRightAnswer', // animation of result
  showingWrongAnswer: 'showingWrongAnswer', // animation of result
  over: 'over' // round is over
});

const Round = ({
  initScoreUnit = 10,
  scoreReducer = 0.98,
  setRoundState,
  render
}) => {
  const [scoreUnit, setScoreUnit] = useState(initScoreUnit);

  useEffect(() => {
    let timer;

    if (roundState === roundStates.init) {
      console.log('round - init');
      setScoreUnit(initScoreUnit);
    }

    if (roundState === roundStates.running) {
      console.log('round - running');
      timer = setInterval(() => {
        setScoreUnit(scoreUnit => scoreUnit * scoreReducer);
      }, 100);
    }

    if (roundState === roundStates.over) {
      if (timer) clearInterval(timer);
    }

    return () => {
      console.log('round - cleanup');
      if (timer) clearInterval(timer);
    };
  }, [roundState]);

  return render({ scoreUnit });
};

export default Round;
