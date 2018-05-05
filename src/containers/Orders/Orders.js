import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <p>No orders</p>;
    if (this.props.orders.length > 0) {
      orders = this.props.orders.map((order) => {
        return <Order key={order.id} {...order} />;
      });
    }

    return (
      <div>
        {this.props.loading ? <Spinner /> : orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actionCreators.fetchOrdersAsync())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
