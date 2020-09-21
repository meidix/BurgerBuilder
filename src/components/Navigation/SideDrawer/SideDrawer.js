import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Div from '../../../hoc/Div';
import BackDrop from '../../UI/BackDrop/BackDrop';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Div>
      <BackDrop show={props.show} clicked={props.closed} classes={classes.DesktopOnly}/>
      <div className={attachedClasses.join(' ')}>
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Div>
  );
};

export default sideDrawer;
