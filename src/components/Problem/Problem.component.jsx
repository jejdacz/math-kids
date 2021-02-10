import React, { Fragment } from 'react';
import CustomButton from '../CustomButton/CustomButton.component';

import './Problem.styles.scss';

const Problem = React.memo(
  ({
    pickAnswer,
    buttonsActive,
    problemSpec: { problem, correctAnswer, answers }
  }) => {
    const createButtons = (correctAnswer, answers) => {
      // create buttons
      const activeButtons = answers.map((x, i) => (
        <CustomButton
          key={i}
          onClick={
            x === correctAnswer
              ? () => pickAnswer({ answer: x, correct: true })
              : () => pickAnswer({ answer: x, correct: false })
          }
          className={`${x === correctAnswer ? 'right' : 'wrong'} answer`}>
          {x}
        </CustomButton>
      ));

      const buttons = answers.map((x, i) => (
        <CustomButton key={i} className={`answer`}>
          {x}
        </CustomButton>
      ));

      return buttonsActive ? activeButtons : buttons;
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
