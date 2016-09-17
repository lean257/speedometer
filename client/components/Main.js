import React from 'react';
import NavBar from './NavBar';

let App = React.createClass({
  render() {
    return(
      <div>
        <NavBar />
        <div className="container-fluid app-dashboard-container">
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
});

export default App;
