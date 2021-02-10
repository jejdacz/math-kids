import React from 'react';
import CustomButton from '../../CustomButton/CustomButton.component';
import Score from '../../Score/Score.component';

const Over = React.memo(({ score, startGame }) => {
  return (
    <div className='app over'>
      <h1 className='main-title'>MATH KIDS</h1>
      <Score className='large' score={score} />
      <CustomButton onClick={startGame} className='button-restart'>
        RESTART
      </CustomButton>
    </div>
  );
});

export default Over;
