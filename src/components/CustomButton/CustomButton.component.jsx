import React from 'react';
import styled from 'styled-components';
//import './CustomButton.styles.scss';

const CustomButton = props => {
  return <button {...props}></button>;
};

/* styled components
  cons:
    no ide hints

  pros:
    one file
*/
const StyledCustomButton = styled(CustomButton)`
  font: inherit;
  font-size: 1.7rem;
  padding: 1.2rem 1.8rem;
  border: 0;
  background-color: hotpink;
  color: white;
  outline: 0;
  border-radius: 0.5rem;
  text-align: center;

  &:focus {
    outline: none;
    border: 4px solid white;
  }
`;

export default StyledCustomButton;
