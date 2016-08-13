'use strict';

import Immutable from 'immutable';
import * as types from '../constants/ActionTypes';

const defaultErrorMessage = 'Something went wrong. Check your connection.';

const initialState = {
  wordsAndDefinitions: Immutable.Map(),
  dictionaries: Immutable.List(),
  activeDictionaryId: '',
  studyFailed: false,
  errorMessage: defaultErrorMessage,
  isLoading: false
};

export default function studyStates(state = new Immutable.Map(initialState), action) {
  switch (action.type) {
    case types.LOAD_DICTIONARIES:
      return state.set("isLoading", true);

    case types.DICTIONARIES_READY:
      return state.set("dictionaries", Immutable.List(action.dictionaries)).set("isLoading", false);

    case types.ACTIVE_DICTIONARY_CHANGED:
      return state.set("activeDictionaryId", action.activeDictionaryId);

    case types.LOAD_STUDY:
      return state.set("isLoading", true).set("studyFailed", false);

    case types.STUDY_READY:
      return state.set("wordsAndDefinitions", Immutable.Map(action.studyData)).set("isLoading", false);

    case types.STUDY_FAILED:
      let errorMessage = action.errorMessage ? action.errorMessage : defaultErrorMessage;
      return state.set("studyFailed", true)
                  .set("errorMessage", errorMessage)
                  .set("wordsAndDefinitions", new Immutable.Map())
                  .set("isLoading", false);

    case types.LEAVE_STUDY:
      state = new Immutable.Map(initialState);
      return state;

    default:
      return state;
  }
}
