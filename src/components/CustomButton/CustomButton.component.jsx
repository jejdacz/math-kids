import React from 'react';
import './CustomButton.styles.scss';

const CustomButton = ({ className, ...props }) => {
  return (
    <button {...props} className={`custom-button ${className ?? ''}`}></button>
  );
};

export default CustomButton;
