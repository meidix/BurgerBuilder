import React, { Component } from "react";
import { connect } from "react-redux";

import * as types from "../../store/actions/actionTypes";
import * as actions from "../../store/actions/BurgerBuilderActions";

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
    this.props.initilizeIngredients();
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
    this.props.history.push("/checkout");
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
          price={this.props.totalPrice.toFixed(2)}
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
    initilizeIngredients: () => {
      dispatch(actions.initilizeIngredients());
    },
    addIngredients: (ingredient) =>
      dispatch(actions.addIngredients(ingredient)),
    removeIngredient: (ingredient) =>
      dispatch(actions.removeIngredient(ingredient)),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(BurgurBuilder, axios));
