import React, { useContext } from 'react';
import classNames from 'classnames';
import './Animate.styles.scss';

export const AnimateContext = React.createContext();
/*
export const Animate = ({ render, id }) => {
  const context = useContext(AnimateContext);
  return render(context[id]);
};*/
/*
export const Animate = ({ children, id }) => {
  const context = useContext(AnimateContext);
  return React.cloneElement(children, { className: context[id] });
};*/

const addClassToChildren = (children, className) => {
  const elements = React.Children.map(children, e => {
    if (React.isValidElement(e)) {
      const c = classNames(e.props.className, className);
      return React.cloneElement(e, { className: c });
    }
    return e;
  });

  return elements;
};

const addStyleToChildren = (children, style) => {
  const elements = React.Children.map(children, e => {
    if (React.isValidElement(e)) {
      return React.cloneElement(e, { style: { ...e.props.style, ...style } });
    }
    return e;
  });

  return elements;
};

export const Animate = ({ children }) => {
  const context = useContext(AnimateContext);

  //return addStyleToChildren(children, context[id]);

  return addClassToChildren(children, classNames(context.name));
};

/*
    alt1: add css class
    alt2: add css style

    alt3: div wrapper with css for all children elements
    css:
        btn1.wrapper > *
            animation......

*/

export default Animate;
