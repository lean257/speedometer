import io from 'socket.io-client';
import React, { PropTypes, cloneElement } from 'react';

import NavBar from './NavBar';

const socket = io(`${location.protocol}//${location.hostname}:4000`);

class App extends React.Component {
  constructor() {
    super();
    socket.on('uri:metrics', ({ uri, metrics }) => {
      this.props.receiveDomainMetrics({ uri, metrics });
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
  receiveDomainMetrics: PropTypes.func,
};

export default App;
