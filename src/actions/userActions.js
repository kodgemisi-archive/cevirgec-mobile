import * as types from '../constants/ActionTypes';
import * as ApiUrls from '../constants/ApiUrls';
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

    fetch(ApiUrls.LOGIN, {
      method: 'post',
      headers: {
        'Authorization': 'Basic ' + btoa(userData.username + ':' + userData.password)
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }

      if (response.status == 401) {
        dispatch(loginError('Invalid username or password.'));
      }
    })
    .then(userAndToken => {
      if (userAndToken) {
        dispatch(loginSuccess(userAndToken));
      }
    })
    .catch(error => {
      dispatch(loginError());
    })
  }
}

export function logout(token) {
  return dispatch => {
    dispatch(logoutAttempt());

    fetch(ApiUrls.LOGOUT, {
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
