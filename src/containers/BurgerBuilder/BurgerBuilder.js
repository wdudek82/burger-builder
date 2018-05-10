import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onIngredientsInit();
  }

  updatePurchaseState = () => {
    const sum = Object.values(this.props.ings).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState((prevState) => ({ purchasing: true }));
  };

  purchaseCancelHandler = () => {
    this.setState(() => ({ purchasing: false }));
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ings ? this.props.ings : {}}
        price={this.props.price}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
    );

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            disabledInfo={disabledInfo}
            purchasable={this.updatePurchaseState()}
            onClick={this.props.onInitPurchase}
            ordered={this.purchaseHandler}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemove}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) =>
      dispatch(actionCreators.addIngredient(ingredientName)),
    onIngredientRemove: (ingredientName) =>
      dispatch(actionCreators.removeIngredient(ingredientName)),
    onIngredientsInit: () =>
      dispatch(actionCreators.initIngredientsAsync()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
