import { useState, useEffect, useCallback } from 'react';
import Problem from '../Problem/Problem.component';
import { TweenLite } from 'gsap';

// TODO useStateMachine hook to transit from one state to another

const Round = ({ roundState }) => {
  
/*
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
  };*/
/*
  useEffect(() => {
    if (roundState === roundStates.init) {
      console.log('roundstate - init');
      setScoreUnit(initScoreUnit);
      stopCountdown();
      setProblemSpec(createProblem(problemOptions));
      setTimeout(() => setRoundState(roundStates.loading), 1000);
    }

    if (roundState === roundStates.loading) {
      console.log('roundstate - loading');
      setTimeout(() => setRoundState(roundStates.running), 1000);
    }

    if (roundState === roundStates.running) {
      console.log('roundstate - running');
      startCountdown();
    }

    if (roundState === roundStates.answerPicked) {
      console.log('roundstate - answer picked');
      stopCountdown();
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

  const reduceScore = useCallback(() => {
    setScoreUnit(scoreUnit => scoreUnit * scoreReducer);
  }, [scoreReducer]);

  const [startCountdown, stopCountdown] = useInterval(reduceScore);

  return <p>{roundState}</p>;
};*/

const useInterval = (func, interval = 100) => {
  const [active, setActive] = useState(false);

  const start = () => setActive(true);
  const stop = () => setActive(false);

  useEffect(() => {
    let timer;

    if (active) {
      console.log('timer - running');
      timer = setInterval(func, interval);
    }
    return () => {
      console.log('timer - cleanup');
      if (timer) clearInterval(timer);
    };
  }, [active]);

  return [start, stop];
};

export default Round;
