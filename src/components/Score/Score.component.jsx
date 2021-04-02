import React from 'react';
import classNames from 'classnames';

import './Score.styles.scss';

const Score = React.memo(({ score, className, style }) => {
  return (
    <div style={style} className={classNames(className, 'score-container')}>
      <h2 className='score'>{score.toFixed(1)}</h2>
      <h2 className='score-title'>score</h2>
    </div>
  );
});

export default Score;
