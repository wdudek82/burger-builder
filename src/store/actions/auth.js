import axios from 'axios';
import { API_KEY } from './api_key';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToke: true
    };
    
    const key = `?key=${API_KEY}`;
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword';
    }

    axios.post(`${url}${key}`, authData)
      .then(res => {
        console.log(res.data);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  }
}