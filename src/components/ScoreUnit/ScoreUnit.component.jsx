import React, { useEffect, useState } from 'react';

const ScoreUnit = ({
  initScoreUnit = 10,
  scoreUnit,
  scoreReducer = 0.98,
  round,
  render
}) => {
  const [localScoreUnit, setLocalScoreUnit] = useState(initScoreUnit);

  useEffect(() => {
    setLocalScoreUnit(initScoreUnit);
    let timer = setInterval(() => {
      scoreUnit = scoreUnit * scoreReducer;
      setLocalScoreUnit(s => s * scoreReducer);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [round]);

  return render(localScoreUnit);
};

export default ScoreUnit;
