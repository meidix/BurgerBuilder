import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';

import BurgurBuilder from './containers/BurgurBuilder/BurgurBuilder';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="{classes.App}">
        <Layout>
          <BurgurBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
