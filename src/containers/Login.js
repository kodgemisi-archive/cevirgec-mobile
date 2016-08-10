'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import DocumentTitle from 'react-document-title'
import * as itemActions from '../actions/userActions'

export default class Login extends Component {

  formElement = null;

  handleSubmit(e) {
    e.preventDefault();

    let user = jQuery(this.formElement).serializeObject();

    this.props.actions.login(user);
  }

  render() {
    return (
      <DocumentTitle title="Cevirgec › Login">
        <div className="ui fluid container">
          <div className="ui basic segment">
            <div className="ui two column centered grid">
              <div className="column">
                <form className="ui large form" ref={c => {this.formElement = c}} onSubmit={this.handleSubmit.bind(this)}>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input type="text" name="username" placeholder="Username" autofocus/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" name="password" placeholder="Password"/>
                    </div>
                  </div>
                  <button className="ui fluid large teal submit button">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.getIn(['userStates', 'user']).toObject(),
    loginFailed: state.getIn(['userStates', 'loginFailed']),
    loginErrorMessage: state.getIn(['userStates', 'loginErrorMessage']),
    isLoading: state.getIn(['userStates', 'isLoading'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(itemActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
