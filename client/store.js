import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

const loggerMiddleware = createLogger();

// import the root reducer
import rootReducer from './reducers/index';

import config from './data/config';

const enhancers = compose(
   window.devToolsExtension
   ? window.devToolsExtension()
   : (f) => f
);

// create an object for the default data
const defaultSate = { config, domains: [] }

const store = createStore(
  rootReducer,
  defaultSate,
  applyMiddleware(thunk, loggerMiddleware)
);

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
