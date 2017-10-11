import React from 'react';
import { Link } from 'react-router';

const NavBar = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link to="/" className="navbar-brand">Speedometer</Link>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/add-domain">Add Domain</Link></li>
          <li><Link to="/notifications">Notifications</Link></li>
          <li><Link to="/login">Welcome An!</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);



export default NavBar;
