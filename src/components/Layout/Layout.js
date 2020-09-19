import React from 'react';

import Div from '../../hoc/Div';
import classes from './Layout.css';

const layout = props => {
  return (
    <Div>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Div>
  );
};

export default layout;
