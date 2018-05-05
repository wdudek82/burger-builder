import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      console.log('purchase has been successfull!');
      return {
        ...state,
        loading: false,
        orders: [
          ...state.orders,
          action.orderData,
        ],
        purchased: true
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      console.log('error!', action.error);
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderReducer;