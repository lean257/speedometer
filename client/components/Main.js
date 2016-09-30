import io from 'socket.io-client';
import React, { PropTypes, cloneElement } from 'react';

import NavBar from './NavBar';

const socket = io(`${location.protocol}//${location.hostname}:4000`);

class App extends React.Component {
  constructor() {
    super();
    socket.on('uri:metrics', () => {
      // TODO: dispatch RECEIVE_DOMAIN_METRIC
      // for now I am fetching all data 🙈
      this.props.fetchDomains();
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="container-fluid app-dashboard-container">
          {cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  fetchDomains: PropTypes.func,
};

export default App;
