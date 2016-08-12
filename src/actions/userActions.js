import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

function loginAttempt() {
  return {
    type: types.USER_LOGIN
  }
}

function loginSuccess(userAndToken) {
  return dispatch => {
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      user: userAndToken.user,
      token: userAndToken.token
    });
  };
}

function loginError(error) {
  return {
    type: types.USER_LOGIN_FAILED,
    error
  };
}

function logoutAttempt() {
  return {
    type: types.USER_LOGOUT
  }
}

function logoutSuccess(token) {
  return {
    type: types.USER_LOGOUT_SUCCESS,
    token
  }
}

export function login(userData) {
  return dispatch => {
    dispatch(loginAttempt());

    fetch('http://192.168.1.43:8080/shop/api/login', {
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
      console.error(error);
      dispatch(loginError('Invalid username or password.'));
    })
  }
}

export function logout(token) {
  return dispatch => {
    dispatch(logoutAttempt());

    fetch('http://192.168.1.43:8080/shop/api/logout', {
      method: 'get',
      headers: {
        'x-auth-token': token
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(logoutSuccess(token));
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
}
