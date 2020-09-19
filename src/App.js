import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="{classes.App}">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
