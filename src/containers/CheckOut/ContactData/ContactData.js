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
      name: this.stateInitalizer(
        "input",
        "name",
        {
          type: "text",
          placeholder: "Your Name",
        },
        {
          required: true,
        }
      ),
      street: this.stateInitalizer(
        "input",
        "street",
        {
          type: "text",
          placeholder: "Street",
        },
        {
          required: true,
        }
      ),
      zipCode: this.stateInitalizer(
        "input",
        "zipCode",
        {
          type: "text",
          placeholder: "Zip Code",
        },
        {
          required: true,
          minLength: 10,
          maxLength: 10,
        }
      ),
      country: this.stateInitalizer(
        "input",
        "country",
        {
          type: "text",
          placeholder: "Country",
        },
        {
          required: true,
        }
      ),
      email: this.stateInitalizer(
        "input",
        "email",
        {
          type: "email",
          placeholder: "Your Email",
        },
        {
          required: true,
        }
      ),
      deliveryMethod: this.stateInitalizer("select", "delivery method", {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      }),
    };

    this.setState({ orderForm: orderForm });
  }

  stateInitalizer = (type, name, config, validation) => {
    return {
      elementType: type,
      name: name,
      elementConfig: config,
      validation: validation,
      value: "",
      valid: false,
    };
  };

  validate = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElement in this.state.orderForm) {
      formData[formElement] = this.state.orderForm[formElement].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.valid = this.validate(
      event.target.value,
      updatedFormElement.validation
    );
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
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
          invalid={!this.state.orderForm[element].valid}
          shouldValidate={this.state.orderForm[element].validation}
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
        <form onSubmit={this.orderHandler}>
          {form}
          <Button btnType="Success">Order Now</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
