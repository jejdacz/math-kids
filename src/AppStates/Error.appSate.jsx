import React from 'react';
import CustomButton from '../components/CustomButton/CustomButton.component';

const Intro = ({ handleGameStart }) => {
  return (
    <div className='app error'>
      <h1 className='main-title'>MATH KIDS</h1>
      <p className='error'>Something bad happened!</p>
      <CustomButton onClick={handleGameStart} className='button-start'>
        RESTART
      </CustomButton>
    </div>
  );
};

export default Intro;
