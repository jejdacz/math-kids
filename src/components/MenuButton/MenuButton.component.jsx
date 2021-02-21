import React, { useRef } from 'react';
import CustomButton from '../CustomButton/CustomButton.component';
import { TimelineLite } from 'gsap';

const MenuButton = ({ onClick, ...props }) => {
  const button = useRef(null);
  const myTimeline = new TimelineLite();

  const handleClick = e => {
    myTimeline
      .to(button.current, {
        duration: 0.1,
        ease: 'power3.out',
        transform: 'scale(0.75)'
      })
      .to(button.current, {
        duration: 0.2,
        ease: 'back.out(3)',
        transform: 'scale(1.0)'
      })
      .to(button.current, {
        duration: 0.2,
        transform: 'scale(1.0)',
        onComplete: () => onClick(e)
      });
  };

  return (
    <CustomButton ref={button} onClick={handleClick} {...props}></CustomButton>
  );
};

export default MenuButton;
