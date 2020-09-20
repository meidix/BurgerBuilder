import React from 'react';

import Div from '../../hoc/Div';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = props => {
  return (
    <Div>
      <Toolbar />
      <main className={classes.Content}>{props.children}</main>
    </Div>
  );
};

export default layout;
