'use strict';

const API_ROOT = 'http://localhost:8080/shop/api/'; //FIXME should take it from some config file.
const GET_DICTIONARIES = API_ROOT + 'users/{username}/dictionaries';

function getDictionariesGetUrl(username) {
  return GET_DICTIONARIES.replace('{username}', username);
}

const urls = {
  LOGIN: API_ROOT + 'login',
  LOGOUT: API_ROOT + 'logout',
  GET_DICTIONARIES: getDictionariesGetUrl
};

module.exports = urls;
