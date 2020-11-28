import React from 'react';
import CustomButton from '../components/CustomButton/CustomButton.component';
import Score from '../components/Score/Score.component';

const Over = ({ handleGameStart, gameResult: { score } }) => {
  return (
    <div className='app over'>
      <h1 className='main-title'>MATH KIDS</h1>
      <Score className='large' score={score} />
      <CustomButton onClick={handleGameStart} className='button-restart'>
        RESTART
      </CustomButton>
    </div>
  );
};

export default Over;
