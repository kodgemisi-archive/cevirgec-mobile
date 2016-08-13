'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import Flashcard from '../components/Flashcard';
import CarouselWrapper from '../components/CarouselWrapper';
import DropdownSearch from '../components/DropdownSearch';
import * as studyActions from '../actions/studyActions'

export default class Study extends Component {

  componentWillMount() {
    this.props.actions.loadDictionaries();
  }

  componentWillUnmount() {
    this.props.actions.leaveStudy();
  }

  onActiveDictionariesChanged(activeDictionaryId) {
    this.props.actions.activeDictionaryChanged(activeDictionaryId);
  }

  startStudy() {
    this.props.actions.loadStudy(this.props.activeDictionaryId);
  }

  render() {
    let that = this;

    let buttonClass = 'ui button';
    buttonClass += this.props.activeDictionaryId ? '' : ' disabled';

    let wordsAndDefinitions = this.props.wordsAndDefinitions;
    let words = Object.keys(wordsAndDefinitions);

    let cards = words.map((word)=>{
      return (
        <Flashcard word={word} definitions={wordsAndDefinitions[word]} />
      );
    });

    return (
      <DocumentTitle title="Cevirgec › Study">
        <div className="ui fluid container">
          <div className="ui basic segment">
            <div className="ui two column centered grid">
              <div className="column">
                <DropdownSearch
                  multiple={false}
                  items={this.props.dictionaries}
                  selectedItems={this.props.activeDictionaryId}
                  onChange={(value, text, $choice)=>{
                    that.onActiveDictionariesChanged(value);
                  }}
                  itemKeys={{valueKey: 'id', contentKey: 'name'}}
                />
                <button className={buttonClass} onClick={this.startStudy.bind(this)}>
                  Start Studying
                </button>
                <Link to="/" className="content">
                  Dashboard
                </Link>
                <div className="ui basic segment">
                  {this.props.isLoading ? <div>Loading</div>
                   : (this.props.studyFailed ? <div>{this.props.errorMessage}</div>
                      : (!cards.length ? null
                        : <CarouselWrapper cards={cards} />
                      )
                     )
                  }
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
    wordsAndDefinitions: state.getIn(['studyStates', 'wordsAndDefinitions']).toObject(),
    dictionaries: state.getIn(['studyStates', 'dictionaries']).toArray(),
    activeDictionaryId: state.getIn(['studyStates', 'activeDictionaryId']),
    studyFailed: state.getIn(['studyStates', 'studyFailed']),
    errorMessage: state.getIn(['studyStates', 'errorMessage']),
    isLoading: state.getIn(['studyStates', 'isLoading'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(studyActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Study)
