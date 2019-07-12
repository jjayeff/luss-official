import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui large secondary pointing menu">
          <NavLink exact to="/" className="item">
            Home
          </NavLink>
          <NavLink to="/products" className="item">
            Produsts
          </NavLink>
          <div className="right menu">
            <div className="item">
              <Link to="/">
                <i className="th flag" />
              </Link>
              <Link to="/">
                <i className="gb uk flag" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
