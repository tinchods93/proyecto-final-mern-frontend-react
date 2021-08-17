import { combineReducers } from 'redux';
import {vPlacesReducer} from './vPlacesReducer';

const rootReducer = (state = {}, action) => {
  return state;
};

export default combineReducers({
  rootReducer,
  vPlacesReducer,
});
