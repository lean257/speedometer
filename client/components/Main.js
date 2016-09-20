import React, { PropTypes, cloneElement } from 'react';
import NavBar from './NavBar';

export default function App(props) {
  return (
    <div>
      <NavBar />
      <div className="container-fluid app-dashboard-container">
        {cloneElement(props.children, props)}
      </div>
    </div>
  );
}

App.propTypes = { children: PropTypes.element };
