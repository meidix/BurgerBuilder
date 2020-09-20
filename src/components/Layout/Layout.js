import React, { Component } from 'react';

import Div from '../../hoc/Div';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  render() {
    return (
      <Div>
        <Toolbar />
        <SideDrawer
          closed={this.sideDrawerCloseHandler}
          show={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Div>
    );
  }
}

export default Layout;
