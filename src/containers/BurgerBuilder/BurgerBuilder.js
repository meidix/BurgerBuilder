import React, { Component } from 'react';
import div from '../../hoc/Div';

import Div from '../../hoc/Div';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgurBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 1,
      meat: 1,
    },
  };
  render() {
    return (
      <Div>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls />
      </Div>
    );
  }
}

export default BurgurBuilder;
