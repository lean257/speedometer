import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import css from './styles/main.sass';

import { Provider } from 'react-redux';
import store, { history } from './store';

// Components
import App from './components/App';
import Dashboard from './components/Dashboard';
import AddDomain from './components/AddDomain';
import Notifications from './components/Notifications';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard}></IndexRoute>
        <Route path="/add-domain" component={AddDomain}></Route>
        <Route path="/notifications" component={Notifications}></Route>
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
