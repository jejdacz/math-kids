import React from 'react';
import CustomButton from '../../CustomButton/CustomButton.component';

const Intro = ({ startGame }) => {
  return (
    <div className='app error'>
      <h1 className='main-title'>MATH KIDS</h1>
      <p className='error'>Something bad happened!</p>
      <CustomButton onClick={startGame} className='button-start'>
        RESTART
      </CustomButton>
    </div>
  );
};

export default Intro;
