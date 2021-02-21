import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { TimelineLite, TweenLite } from 'gsap';
import { darken } from 'polished';

//import styles from './CustomButton.styles.module.scss';

const buttonStates = Object.freeze({
  ready: 'ready',
  clicked: 'clicked',
  clickFinished: 'clickFinished'
});

const CustomButton = ({ onClick, onClickFinished, ...props }) => {
  const [state, setState] = useState(buttonStates.ready);

  const button = useRef(null);

  const handleClick = e => {
    state === buttonStates.ready && setState(buttonStates.clicked);
  };

  useEffect(() => {
    if (state === buttonStates.clicked) {
      if (onClickFinished && onClick) onClick();
      const myTimeline = new TimelineLite();
      const onComplete = () => {
        setState(buttonStates.clickFinished);
      };
      myTimeline
        .to(button.current, 0.5, {
          transform: 'scale(0.85)'
        })
        .to(button.current, 0.5, {
          transform: 'scale(1.0)',
          onComplete: onComplete
        });
    } else if (state === buttonStates.clickFinished) {
      onClickFinished ? onClickFinished() : onClick();
      setState(buttonStates.ready);
    }
  }, [state]);

  return (
    <button ref={button} onClick={() => onClick(state)} {...props}></button>
  );
};

/* styled components

  cons:
    no ide hints
    no scss functions (darken) ----> could be replace by JS function

  pros:
    one file
    css unique class id

  ********************

  theming:
    theme imported in index.js and provided by ThemeProvider from styled-components lib
*/

const appear = keyframes`
  from {
    transform: scale(0.8);
  }

  to {
    transform: scale(1.0);
  }
`;

const StyledCustomButton = styled(CustomButton)`
  font: inherit;
  font-size: 1.7rem;
  padding: 1.2rem 1.8rem;
  border: 0;
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.onSecondary};
  outline: 0;
  border-radius: 0.5rem;
  text-align: center;
  user-select: none;

  &:focus {
    outline: none;
  }
`;

StyledCustomButton.defaultProps = {
  theme: {
    secondary: '#fff'
  }
};

export default StyledCustomButton;
