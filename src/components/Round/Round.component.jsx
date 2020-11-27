import React, { useState, useEffect } from 'react';
import { roundStates } from '../../App';

const Round = ({
  initScoreUnit = 10,
  scoreReducer = 0.98,
  roundState,
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
