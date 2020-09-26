import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/ErrorHadler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
  };
  componentDidMount() {
    axios.get('/orders.json').then(response => {
      const fetchOrders = [];
      for (let key in response.data) {
        fetchOrders.push({ ...response.data[key], id: key });
      }
      this.setState({ orders: fetchOrders });
    });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
