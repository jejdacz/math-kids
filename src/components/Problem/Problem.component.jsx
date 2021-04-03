import React, { Fragment } from 'react';
import CustomButton from '../CustomButton/CustomButton.component';
import Animate from '../Animate/Animate.component';
import classNames from 'classnames';

import './Problem.styles.scss';

const Problem = React.memo(
  ({
    checkAnswer,
    selectedButton,
    problemSpec: { problem, correctAnswer, answers }
  }) => {
    const createButtons = (correctAnswer, answers) => {
      // create buttons
      const buttons = answers.map((x, i) => (
        <CustomButton
          key={i}
          onClick={checkAnswer(
            x === correctAnswer
              ? { answer: x, correct: true, index: i }
              : { answer: x, correct: false, index: i }
          )}
          className={classNames(
            'game-button',
            x === correctAnswer ? 'success' : 'fail',
            selectedButton === i && 'selected'
          )}>
          {x}
        </CustomButton>
      ));

      return buttons;
    };

    return (
      <Fragment>
        <Animate>
          <div className='problem'>{problem} = </div>
        </Animate>
        <div className='answer-container'>
          <Animate>{createButtons(correctAnswer, answers)}</Animate>
        </div>
      </Fragment>
    );
  }
);

Problem.displayName = 'Problem';

export default Problem;
