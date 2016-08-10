'use strict';

import Immutable from 'immutable';
import * as types from '../constants/ActionTypes';

const defaultLoginErrorMessage = 'Oops. Something went wrong. Check your connection.';

const initialState = {
  user: Immutable.Map(JSON.parse(window.localStorage.getItem("user"))),
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
      return state.set("user", Immutable.Map(action.user)).set("isLoading", false);

    case types.USER_LOGIN_FAILED: {
    }

    default:
      return state;
  }
}

function addTags(state, tags) {
  tags.forEach((tag)=>{
    state = state.add(tag);
  });

  return state;
}
