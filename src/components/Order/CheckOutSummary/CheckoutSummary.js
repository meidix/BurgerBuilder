import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
  let burger = null;
  if (props.ingredients) {
    burger = <Burger ingredients={props.ingredients} />;
  }

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '300px', margin: 'auto' }}>{burger}</div>
      <Button btnType="Danger" clicked={props.cancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        Success
      </Button>
    </div>
  );
};

export default checkoutSummary;
