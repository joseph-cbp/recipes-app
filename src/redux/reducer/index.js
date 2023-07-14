import { combineReducers } from 'redux';
import user from './user';
import recipe from './recipe';

const rootReducer = combineReducers({ recipe });

export default rootReducer;
