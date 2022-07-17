import { combineReducers } from 'redux';
import household from './householdReducer';
import modal from './modalReducer';
import userRole from './roleReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  user,
  userRole,
  modal,
  household,
});

export default rootReducer;
