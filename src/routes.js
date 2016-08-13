import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import Dashboard from 'containers/Dashboard';
import Login from 'containers/Login';
import Study from 'containers/Study';

function loggedIn() {
  return localStorage.getItem("token") ? true : false;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace('/login');
  }
}

export default (
  <Route path="/">
    <IndexRoute component={Dashboard} onEnter={requireAuth} />
    <Route path="/login" component={Login} />
    <Route path="/study" component={Study} />
  </Route>
);
