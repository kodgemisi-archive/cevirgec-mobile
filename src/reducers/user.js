'use strict';

import Immutable from 'immutable';
import * as types from '../constants/ActionTypes';

const defaultLoginErrorMessage = 'Oops. Something went wrong. Check your connection.';

const initialState = {
  user: Immutable.Map(JSON.parse(window.localStorage.getItem("user"))),
  token: window.localStorage.getItem("token"),
  loginFailed: false,
  loginErrorMessage: defaultLoginErrorMessage,
  isLoading: false
};

export default function userStates(state = new Immutable.Map(initialState), action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return state.set("isLoading", true);

    case types.USER_LOGIN_SUCCESS:
      window.localStorage.setItem("user", JSON.stringify(action.user));
      window.localStorage.setItem("token", action.token);
      return state.set("user", Immutable.Map(action.user))
                  .set("token", action.token)
                  .set("loginFailed", false)
                  .set("loginErrorMessage", defaultLoginErrorMessage)
                  .set("isLoading", false);

    case types.USER_LOGIN_FAILED:
      return state.set("loginFailed", true)
                  .set("loginErrorMessage", action.error)
                  .set("isLoading", false);

    case types.USER_LOGOUT:
      return state.set("isLoading", true);

    case types.USER_LOGOUT_SUCCESS: {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      state = new Immutable.Map(initialState);
      return state;
    }

    default:
      return state;
  }
}
