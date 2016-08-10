import { combineReducers } from 'redux-immutable';
import userStates from './user';

const rootReducer = combineReducers({
  userStates
})

export default rootReducer
