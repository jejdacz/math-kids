import React from 'react';
import CustomButton from '../../CustomButton/CustomButton.component';

const Intro = React.memo(({ startGame }) => {
  return (
    <div className='app intro'>
      <h1 className='main-title'>MATH KIDS</h1>
      <CustomButton onClick={startGame} className='button-start'>
        START
      </CustomButton>
    </div>
  );
});

Intro.displayName = 'Intro';

export default Intro;
