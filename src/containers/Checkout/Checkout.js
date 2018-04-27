import React from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    },
    price: 0
  };

  componentDidMount() {
    console.log('Checkout', this.props);
    const searchParams = this.props.location.search;
    const query = new URLSearchParams(searchParams);
    console.log('price: ', query.get('price'));

    const ingredients = {};
    for (let [k, v] of query.entries()) {
      if (k !== 'price') {
        ingredients[k] = +v;
      }
    }
    this.setState(() => ({ ingredients: ingredients }));
    this.setState(() => ({ price: query.get('price') }));
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
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
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
