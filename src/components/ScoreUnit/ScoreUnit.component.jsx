import React from 'react';

const ScoreUnit = ({ scoreUnit }) => {
  return <h2 className='score-unit'>{scoreUnit.toFixed(2)}</h2>;
};

export default ScoreUnit;
