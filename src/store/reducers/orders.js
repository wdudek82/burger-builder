import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null
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
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default orderReducer;