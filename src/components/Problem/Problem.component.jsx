import React, { Fragment } from 'react';
import CustomButton from '../CustomButton/CustomButton.component';

import './Problem.styles.scss';

const Problem = ({
  handleSuccess,
  handleFail,
  problemSpec: { problem, correctAnswer, answers }
}) => {
  const createButtons = (correctAnswer, answers) => {
    // create buttons
    const buttons = answers.map((x, i) => (
      <CustomButton
        key={i}
        onClick={x === correctAnswer ? handleSuccess : handleFail}
        className={`${x === correctAnswer ? 'right' : 'wrong'} answer`}>
        {x}
      </CustomButton>
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
};

export default Problem;
