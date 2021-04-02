import React, { useRef, useState, useEffect, useMemo } from 'react';
import CustomButton from '../CustomButton/CustomButton.component';
import styled from 'styled-components';
import { TimelineLite } from 'gsap';

const buttonStates = Object.freeze({
  ready: 'ready',
  clicked: 'clicked'
});

const GameButton = ({
  onClickStart,
  onClickComplete,
  enabled,
  position,
  effect,
  ...props
}) => {
  const [state, setState] = useState(buttonStates.ready);

  const gbref = useRef(null);

  const clickTimeline = useMemo(() => new TimelineLite({ paused: true }), []);

  useEffect(() => {
    console.log('gb timeline adjusted');

    clickTimeline
      .addLabel('success')
      .to(gbref.current, {
        duration: 0.1,
        ease: 'power3.out',
        transform: 'scale(0.75)'
      })
      .to(gbref.current, {
        duration: 0.2,
        ease: 'back.out(3)',
        transform: 'scale(1.0)'
      })
      .to(gbref.current, {
        duration: 0.5,
        delay: 0.2,
        ease: 'power3.out',
        rotation: '+=360'
      })
      .call(
        tl => {
          console.log('fail skip reached');
          tl.play('over');
        },
        [clickTimeline]
      )
      .addLabel('fail', '+=0.1')
      .to(
        gbref.current,
        {
          duration: 0.03,
          x: '+=4',
          yoyo: true,
          repeat: 13
        },
        'fail'
      )
      .addLabel('over', '+=0.1')
      .call(() => console.log('over reached'), [])
      .set(
        gbref.current,
        {
          x: '0',
          y: '0',
          z: '0',
          rotation: '0'
        },
        'over+=0.2'
      );
    /*
      .addPause('fail', () => {
        console.log('onpause');
        clickTimeline.play('over');
      });*/

    return () => {
      console.log('bg cleanup');
      clickTimeline.kill();
    };
  }, []);

  const handleClick = e => {
    if (enabled && state === buttonStates.ready) {
      console.log('gb clicked');
      setState(buttonStates.clicked);

      clickTimeline.eventCallback('onComplete', () => {
        onClickComplete(e);
        setState(buttonStates.ready);
      });

      //clickTimeline.restart();

      console.log('effect', effect);
      //clickTimeline.seek(effect);
      clickTimeline.play(effect);

      onClickStart(e);
    }
  };

  return (
    <CustomButton ref={gbref} onClick={handleClick} {...props}></CustomButton>
  );
};

const StyledGameButton = styled(GameButton)`
  padding: 1rem 1.5rem;
  margin: 0rem;

  &:focus {
    box-shadow: none;
  }
`;

export default StyledGameButton;
