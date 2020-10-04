import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        name: 'email',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
        validation: {
          required: true,
          isEmail: true,
        },
        value: '',
        valid: false,
        isTouched: false,
      },
      password: {
        elementType: 'input',
        name: 'password',
        elementConfig: {
          type: 'password',
          placeholder: 'Your Password',
        },
        validation: {
          required: true,
          minLength: 6,
        },
        value: '',
        valid: false,
        isTouched: false,
      },
    },
  };

  validate = (value, rules) => {
    let isValid = true;

    if (rules && rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules && rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules && rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.validate(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        isTouched: true,
      },
    };

    this.setState({ controls: updatedControls });
  };

  render() {
    let form = Object.keys(this.state.controls).map(element => {
      return (
        <Input
          elementType={this.state.controls[element].elementType}
          elementConfig={this.state.controls[element].elementConfig}
          key={element}
          value={this.state.controls[element].value}
          invalid={!this.state.controls[element].valid}
          shouldValidate={this.state.controls[element].validation}
          inputChanged={event => this.inputChangedHandler(event, element)}
          touched={this.state.controls[element].isTouched}
        />
      );
    });
    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
