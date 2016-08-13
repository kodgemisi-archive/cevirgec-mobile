'use strict';

const API_ROOT = 'http://localhost:8080/shop/api/'; //FIXME should take it from some config file.
const GET_DICTIONARIES = API_ROOT + 'users/mobile/{username}/dictionaries';
const GET_STUDY = API_ROOT + 'dictionaries/{dictionaryId}/study';

function getDictionariesGetUrl(username) {
  return GET_DICTIONARIES.replace('{username}', username);
}

function getStudy(dictionaryId) {
  return GET_STUDY.replace('{dictionaryId}', dictionaryId);
}

const urls = {
  LOGIN: API_ROOT + 'login',
  LOGOUT: API_ROOT + 'logout',
  GET_DICTIONARIES: getDictionariesGetUrl,
  GET_STUDY: getStudy
};

module.exports = urls;
