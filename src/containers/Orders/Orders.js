import React from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('orders.json')
      .then((res) => {
        let orders = [];
        for (let key in res.data) {
          orders.push({ id: key, ...res.data[key] });
        }
        this.setState(() => ({ orders }));
      })
      .catch((err) => {
        this.setState(() => ({ loading: false }));
      });
  }

  render() {
    let orders = <p>No orders</p>;
    if (this.state.orders.length > 0) {
      orders = this.state.orders.map((order) => {
        return <Order key={order.id} {...order} />;
      });
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
