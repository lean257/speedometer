import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';
import config from './data/config';

const loggerMiddleware = createLogger();

// create an object for the default data
const defaultSate = { config, domains: [] };

const store = createStore(
  rootReducer,
  defaultSate,
  applyMiddleware(thunk, loggerMiddleware)
);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default; // eslint-disable-line
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
