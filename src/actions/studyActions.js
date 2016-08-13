import * as types from '../constants/ActionTypes';
import * as ApiUrls from '../constants/ApiUrls';
import fetch from 'isomorphic-fetch';

function dictionariesReady(dictionaries) {
  return dispatch => {
    dispatch({
      type: types.DICTIONARIES_READY,
      dictionaries
    });
  }
}

function studyError(errorMessage) {
  return {
    type: types.STUDY_FAILED,
    errorMessage
  }
}

function studyReady(studyData) {
  return dispatch => {
    dispatch({
      type: types.STUDY_READY,
      studyData
    });
  }
}

export function leaveStudy() {
  return {
    type: types.LEAVE_STUDY
  }
}

export function activeDictionaryChanged(activeDictionaryId) {
  return {
    type: types.ACTIVE_DICTIONARY_CHANGED,
    activeDictionaryId
  }
}

function getToken() {
  return localStorage.getItem("token");
}

export function loadDictionaries() {
  return dispatch => {
    dispatch({
      type: types.LOAD_DICTIONARIES
    });

    let username = JSON.parse(localStorage.getItem("user")).username;
    let token = getToken();
    let url = ApiUrls.GET_DICTIONARIES(username);

    fetch(url, {
      method: 'get',
      headers: {
        'x-auth-token': token
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then(dictionaries => {
      dispatch(dictionariesReady(dictionaries));
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export function loadStudy(dictionaryId) {
  return dispatch => {
    dispatch({
      type: types.LOAD_STUDY
    });

    let url = ApiUrls.GET_STUDY(dictionaryId);

    fetch(url, {
      method: 'get',
      headers: {
        'x-auth-token': getToken()
      }
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
    })
    .then(studyData => {
      if (studyData.error) {
        dispatch(studyError(studyData.userMessage));
      } else {
        dispatch(studyReady(studyData));
      }
    })
    .catch(error => {
      dispatch(studyError());
    })
  }
}
