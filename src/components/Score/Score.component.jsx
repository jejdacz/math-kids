import React from 'react';

import './Score.styles.scss';

const Score = ({ score, className }) => {
  return (
    <div className={`${className ? className : ''} score-container`}>
      <h2 className='score'>{score.toFixed(1)}</h2>
      <h2 className='score-title'>score</h2>
    </div>
  );
};

export default Score;
