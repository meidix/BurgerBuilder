import React, { Component } from "react";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: null,
      street: null,
      zipCode: null,
      country: null,
      email: null,
      deliveryMethod: null,
    },
    loading: false,
  };

  componentWillMount() {
    const orderForm = {
      name: this.stateInitalizer("input", "name", {
        type: "text",
        placeholder: "Your Name",
      }),
      street: this.stateInitalizer("input", "street", {
        type: "text",
        placeholder: "Street",
      }),
      zipCode: this.stateInitalizer("input", "zipCode", {
        type: "text",
        placeholder: "Zip Code",
      }),
      country: this.stateInitalizer("input", "country", {
        type: "text",
        placeholder: "Country",
      }),
      email: this.stateInitalizer("input", "email", {
        type: "email",
        placeholder: "Your Email",
      }),
      deliveryMethod: this.stateInitalizer("select", "delivery method", {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      }),
    };

    this.setState({ orderForm: orderForm });
  }

  stateInitalizer = (type, name, config) => {
    return {
      elementType: type,
      name: name,
      elementConfig: config,
      value: "",
    };
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    };

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    let form = Object.keys(this.state.orderForm).map((element) => {
      return (
        <Input
          elementType={this.state.orderForm[element].elementType}
          elementConfig={this.state.orderForm[element].elementConfig}
          key={element}
          value={this.state.orderForm[element].value}
          inputChanged={(event) => this.inputChangedHandler(event, element)}
        />
      );
    });

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Provide us with your contact Data here!</h4>
        <form>
          {form}
          <Button
            clicked={(event) => this.orderHandler(event)}
            btnType="Success"
          >
            Order Now
          </Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
