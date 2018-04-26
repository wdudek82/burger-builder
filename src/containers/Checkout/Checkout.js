import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    }
  };

  componentDidMount() {
    const searchParams = this.props.location.search;
    const query = new URLSearchParams(searchParams);

    const ingredients = {};
    for (let [k, v] of query.entries()) {
      ingredients[k] = +v;
    }
    this.setState(() => ({ ingredients: ingredients}));
  }

  checkoutCancelledHandler = () => {
    console.log('checkout cancelled');
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    console.log('checkout continued');
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;
