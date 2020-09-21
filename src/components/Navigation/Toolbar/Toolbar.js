import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from './DrawerToggle/DrawerToggler';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggler toggleSide={props.toggleSideDrawer} />
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
