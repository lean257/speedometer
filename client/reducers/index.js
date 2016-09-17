import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import config from './config';
import domains from './domains';

const rootReducer = combineReducers({
  config,
  domains,
  routing: routerReducer
});

export default rootReducer;
