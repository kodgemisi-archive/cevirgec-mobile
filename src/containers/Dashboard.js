'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import * as userActions from '../actions/userActions'
import '../styles/dashboard.scss';

export default class Dashboard extends Component {

  userLoggedIn() {
    return localStorage.getItem("user") && localStorage.getItem("token");
  }

  componentDidUpdate() {
    if (!this.userLoggedIn()) {
      window.location.hash = '#/login';
    }
  }

  logout() {
    this.props.actions.logout(this.props.token);
  }

  render() {
    return (
      <DocumentTitle title="Cevirgec > Dashboard">
        <div className="ui fluid container">
          <div className="ui basic segment">
            <div className="ui two column centered grid">
              <div className="column">
                <button className="ui teal button right floated" style={{marginBottom: 7}} onClick={this.logout.bind(this)}>
                  Logout
                </button>
                <div className="ui fluid card">
                  <Link to="/study" className="content">
                    <i className="student icon big"></i>
                  </Link>
                  <div className="content">
                    <a className="header">Study</a>
                  </div>
                </div>
                <div className="ui horizontal divider">
                  Or
                </div>
                <div className="ui fluid card">
                  <Link to="/quiz" className="content">
                    <i className="file text outline icon big"></i>
                  </Link>
                  <div className="content">
                    <a className="header">Quiz</a>
                  </div>
                </div>
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
    token: state.getIn(['userStates', 'token'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
