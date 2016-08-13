import { combineReducers } from 'redux-immutable';
import userStates from './user';
import studyStates from './study';

const rootReducer = combineReducers({
  userStates,
  studyStates
})

export default rootReducer
