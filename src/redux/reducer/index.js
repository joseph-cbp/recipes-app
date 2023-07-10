import { combineReducers } from 'redux';
import user from './user';
import recipe from './recipe';

const rootReducer = combineReducers({ user, recipe });

export default rootReducer;
