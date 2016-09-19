import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import './styles/main.sass';
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
        <IndexRoute component={Dashboard} />
        <Route path="/add-domain" component={AddDomain} />
        <Route path="/notifications" component={Notifications} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
