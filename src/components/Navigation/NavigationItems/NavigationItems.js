import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active={props.location.pathname === '/'}>
        Burger Builder
      </NavigationItem>
      <NavigationItem
        link="/checkout"
        active={props.location.pathname === '/checkout'}
      >
        Checkout
      </NavigationItem>
      <NavigationItem
        link="/orders"
        active={props.location.pathname === '/orders'}
      >
        Orders
      </NavigationItem>
      <NavigationItem link="/auth" active={props.location.pathname === '/auth'}>
        Authenticate
      </NavigationItem>
    </ul>
  );
};

export default withRouter(navigationItems);
