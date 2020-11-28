import React from 'react';

import './MainTitle.styles.scss';

const MainTitle = ({ className, children, ...props }) => {
  return (
    <h1 className={`${className ? className : ''} main-title`} {...props}>
      {children}
    </h1>
  );
};

export default MainTitle;
