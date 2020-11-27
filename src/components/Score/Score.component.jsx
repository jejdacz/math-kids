import React from 'react';

import './Score.styles.scss';

const Score = ({ score, children }) => {
  return (
    <div className='score-container'>
      <h2 className='score'>{score.toFixed(1)}</h2>
      <h2 className='score-title'>score</h2>
      {children}
    </div>
  );
};

export default Score;
