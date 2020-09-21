import React from 'react';

import classes from './BackDrop.css';

const backDrop = props => {
  const attachedClasses = [classes.BackDrop]

  if (props.classes) {
    attachedClasses.push(props.classes)
  }
  return props.show ? (
    <div className={attachedClasses.join(' ')} onClick={props.clicked}></div>
  ) : null;
};

export default backDrop;
