import React, { useState, useEffect } from 'react';

export const roundStates = Object.freeze({
  init: 'init', // components hidden
  loading: 'loading', // showing components
  ready: 'ready', // components ready
  running: 'running', // timer started
  answerPicked: 'answerPicked', // answer picked, disable buttons
  success: 'success', // animation of result
  fail: 'fail', // animation of result
  over: 'over' // round is over
});

const Round = ({
  initScoreUnit = 10,
  scoreReducer = 0.98,
  onSuccess,
  onRoundOver,
  render
}) => {
  const [scoreUnit, setScoreUnit] = useState(initScoreUnit);
  const [timerActive, setTimerActive] = useState(false);
  const [roundState, setRoundState] = useState(roundStates.init);

  const handleSuccess = () => {
    console.log('handle-success');
    setRoundState(roundStates.answerPicked);
    onSuccess(scoreUnit);
    setTimeout(() => setRoundState(roundStates.success), 1000);
  };

  const handleFail = () => {
    console.log('handle-fail');
    setRoundState(roundStates.answerPicked);
    setTimeout(() => setRoundState(roundStates.fail), 1000);
  };

  useEffect(() => {
    if (roundState === roundStates.init) {
      console.log('roundstate - init');
      setScoreUnit(initScoreUnit);
      setTimerActive(false);
      setTimeout(() => setRoundState(roundStates.loading), 1000);
    }

    if (roundState === roundStates.loading) {
      console.log('roundstate - loading');
      setTimeout(() => setRoundState(roundStates.running), 1000);
    }

    if (roundState === roundStates.running) {
      console.log('roundstate - running');
      setTimerActive(true);
    }

    if (roundState === roundStates.answerPicked) {
      console.log('roundstate - answer picked');
      setTimerActive(false);
    }

    if (roundState === roundStates.fail) {
      console.log('roundstate - fail');
      setTimeout(() => setRoundState(roundStates.over), 1000);
    }

    if (roundState === roundStates.success) {
      console.log('roundstate - success');
      setTimeout(() => setRoundState(roundStates.over), 1000);
    }

    if (roundState === roundStates.over) {
      console.log('roundstate - over');
      onRoundOver(() => setRoundState(roundStates.init));
    }
  }, [roundState]);

  useEffect(() => {
    let timer;

    if (timerActive) {
      console.log('timer - running');
      timer = setInterval(() => {
        setScoreUnit(scoreUnit => scoreUnit * scoreReducer);
      }, 100);
    }

    return () => {
      console.log('timer - cleanup');
      if (timer) clearInterval(timer);
    };
  }, [timerActive]);

  return render({ scoreUnit, handleSuccess, handleFail });
};

export default Round;
