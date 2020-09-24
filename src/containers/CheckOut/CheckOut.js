import React, { Component } from "react";

import CheckoutSummary from "../../components/Order/CheckOutSummary/CheckoutSummary";

class Chekcout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancel={this.checkoutCancelled}
          continue={this.checkoutContinued}
        />
      </div>
    );
  }
}

export default Chekcout;
