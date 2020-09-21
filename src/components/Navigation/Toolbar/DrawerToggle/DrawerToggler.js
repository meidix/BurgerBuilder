import React from 'react';
import classes from './DrawerToggler.css';

const drawerToggler = props => {
  return (
    <div onClick={props.toggleSide} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default drawerToggler;
