import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
};

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData: {
      ...orderData,
      id: orderId
    }
  };
};

export const purchaseBurgerSuccessAsync = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json', orderData)
      .then((res) => {
        console.log(res.data);
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL
  }
}

export const fetchOrdersAsync = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get('orders.json')
      .then((res) => {
        let orders = [];
        for (let key in res.data) {
          orders.push({ id: key, ...res.data[key] });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
