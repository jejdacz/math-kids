import React from 'react';
import styled from 'styled-components';
/*
const CustomButton = React.forwardRef((props, ref) => (
  <button ref={ref} {...props}></button>
));
*/

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

const StyledCustomButton = styled.button`
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
