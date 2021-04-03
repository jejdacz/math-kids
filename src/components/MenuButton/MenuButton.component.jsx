import React, { useRef, useEffect, useMemo } from 'react';
import CustomButton from '../CustomButton/CustomButton.component';
import { TimelineLite } from 'gsap';

const MenuButton = ({ onClick, ...props }) => {
  const button = useRef(null);
  const myTimeline = useMemo(() => new TimelineLite({ paused: true }), []);

  const handleClick = e => {
    myTimeline.eventCallback('onComplete', () => onClick(e));
    myTimeline.restart();
  };

  useEffect(() => {
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
        transform: 'scale(1.0)'
      });
    return () => {
      myTimeline.kill();
    };
  }, []);

  return (
    <CustomButton ref={button} onClick={handleClick} {...props}></CustomButton>
  );
};

export default MenuButton;
