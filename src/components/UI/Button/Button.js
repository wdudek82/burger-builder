import React from 'react';
import classes from './Button.css';

const button = (props) => {
  const style = [classes.Button, classes[props.btnType]].join(' ');
  return (
    <button
      onClick={props.clicked}
      className={style}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default button;
