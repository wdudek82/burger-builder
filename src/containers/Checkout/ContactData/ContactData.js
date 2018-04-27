import React from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends React.Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
    ingredients: this.props.ingredients,
    price: Number(this.props.price)
  };

  componentWillMount() {
    console.log('ContactData: ', this.props);
    console.log('ContactData state: ', this.state);
  }

  orderHandler = (e) => {
    e.preventDefault();

    this.setState(() => ({ loading: true }));
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: 'Wojciech Dudek',
        address: {
          street: 'Teststreet 1',
          zipcode: 13244,
          contry: 'Poland'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order)
      .then((res) => {
        this.setState(() => ({ loading: false, purchasing: false }));
        this.props.history.replace('/');
      })
      .catch((err) => {
        this.setState(() => ({ loading: false, purchasing: false }));
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
