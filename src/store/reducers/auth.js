import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = state => ({
  ...state,
  error: null,
  loading: true
});

const authSuccess = (state, action) => ({
  ...state,
  token: action.idToken,
  userId: action.userId,
  error: null,
  loading: false
});

const authFail = (state, action) => ({
  ...state,
  error: action.error,
  loading: false
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    default:
      return state;
  }
}

export default authReducer;