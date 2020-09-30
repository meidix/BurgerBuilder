import React, { Component } from "react";
import { connect } from "react-redux";

import * as types from "../../store/actions";

import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummery/OrderSummery";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/ErrorHadler/withErrorHandler";

class BurgurBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  letPurchase = (ingredients) => {
    const ingredientCount = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return ingredientCount > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelhandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummery = null;
    let burger = <Spinner />;
    if (this.props.ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.addIngredients}
            ingredientRemoved={this.props.removeIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.letPurchase(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );

      orderSummery = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelhandler}
          purchasedContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummery = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelhandler}
        >
          {orderSummery}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ings: state.ingredientsState.ingredients,
    totalPrice: state.ingredientsState.totalPrice,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addIngredients: (ingredient) =>
      dispatch({
        type: types.ADD_INGREDIENTS,
        ingredientName: ingredient,
      }),
    removeIngredient: (ingredient) =>
      dispatch({
        type: types.REMOVE_INGREDIENTS,
        ingredientName: ingredient,
      }),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(BurgurBuilder, axios));
