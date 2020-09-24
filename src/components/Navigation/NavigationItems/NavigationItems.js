import React from "react";
import { withRouter } from "react-router-dom";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active={props.location.pathname === "/"}>
        Burger Builder
      </NavigationItem>
      <NavigationItem
        link="/checkout"
        active={props.location.pathname === "/checkout"}
      >
        Checkout
      </NavigationItem>
    </ul>
  );
};

export default withRouter(navigationItems);
