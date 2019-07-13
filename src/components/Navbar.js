import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Narbar.css';

export class Navbar extends Component {
  render() {
    return (
      <header className={this.props.transparent ? '' : 'main-header'}>
        <div className={this.props.transparent ? 'black' : ''}>
          <div
            className={`ui container large secondary pointing menu ${
              this.props.transparent ? 'inverted' : ''
            }`}
          >
            <NavLink exact to="/" className="item">
              Home
            </NavLink>
            <NavLink to="/products" className="item">
              Produsts
            </NavLink>
            <NavLink to="/payment" className="item">
              Confirm Payment
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
      </header>
    );
  }
}

export default Navbar;
