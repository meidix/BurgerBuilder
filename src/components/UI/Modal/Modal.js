import React from 'react';

import Div from '../../../hoc/Div';
import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop';

const modal = props => {
  const style = {
    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1' : '0',
  };
  // return <Div classes={classes.Modal}>{props.children}</Div>;
  return (
    <Div>
      <BackDrop show={props.show} clicked={props.modalClosed} />
      <div className={classes.Modal} style={style}>
        {props.children}
      </div>
    </Div>
  );
};

export default modal;
