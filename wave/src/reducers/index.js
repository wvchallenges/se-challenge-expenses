import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import csv from 'reducers/csv';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  csv,
});

export default rootReducer;
