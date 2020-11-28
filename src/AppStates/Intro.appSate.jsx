import React from 'react';
import CustomButton from '../components/CustomButton/CustomButton.component';

const Intro = ({ handleGameStart }) => {
  return (
    <div className='app intro'>
      <h1 className='main-title'>MATH KIDS</h1>
      <CustomButton onClick={handleGameStart} className='button-start'>
        START
      </CustomButton>
    </div>
  );
};

export default Intro;
