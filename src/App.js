import React, { Component } from "react";
import logo from "./logo.svg";
import classes from "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./containers/Layout/Layout";
import Checkout from "./containers/CheckOut/CheckOut";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Layout>
            <Switch>
              <Route path="/checkout" exact component={Checkout} />
              <Route path="/" component={BurgerBuilder} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
