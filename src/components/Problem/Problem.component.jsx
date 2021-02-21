import React, { Fragment } from 'react';
import GameButton from '../GameButton/GameButton.component';

import './Problem.styles.scss';

const Problem = React.memo(
  ({
    stopRound,
    checkAnswer,
    finishRound,
    buttonsEnabled,
    problemSpec: { problem, correctAnswer, answers }
  }) => {
    const createButtons = (correctAnswer, answers) => {
      // create buttons
      const buttons = answers.map((x, i) => (
        <GameButton
          key={i}
          onClickStart={stopRound}
          onClickComplete={
            x === correctAnswer
              ? () => checkAnswer({ answer: x, correct: true })
              : () => checkAnswer({ answer: x, correct: false })
          }
          enabled={buttonsEnabled}
          effect={x === correctAnswer ? 'success' : 'fail'}>
          {x}
        </GameButton>
      ));

      return buttons;
    };

    return (
      <Fragment>
        <div className='problem'>{problem} = </div>
        <div className='answer-container'>
          {createButtons(correctAnswer, answers)}
        </div>
      </Fragment>
    );
  }
);

Problem.displayName = 'Problem';

export default Problem;
