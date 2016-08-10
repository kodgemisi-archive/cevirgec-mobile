import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

export function loginAttempt() {
  return {
    type: types.USER_LOGIN
  }
}

export function loginSuccess(userAndToken) {
  return dispatch => {
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      user: userAndToken.user,
      token: userAndToken.token
    });
  };
}

export function loginError(error) {
  return {
    type: types.USER_LOGIN_FAILED,
    error
  };
}

export function login(userData) {
  return dispatch => {
    dispatch(loginAttempt());

    fetch('http://localhost:8080/shop/api/login', {
      method: 'post',
      headers: {
        'Authorization': 'Basic ' + btoa(userData.username + ':' + userData.password)
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then(userAndToken => {
      dispatch(loginSuccess(userAndToken));
    })
    .catch(error => {
      dispatch(loginError(error));
    })
  }
}
