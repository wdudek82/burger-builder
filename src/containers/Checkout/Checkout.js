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
    console.log(this.props.location.search);
    const searchParams = this.props.location.search;
    const ingredients = new URLSearchParams(searchParams);

    for (let [k, v] of ingredients.entries()) {
      this.setState((prevState) => (prevState.ingredients[k] = +v));
    }
    console.log(this.state);
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
