import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login_account } from '../../../../reducers/authReducer';
import Login from './Login';
import Navbar from '../../../Navbar';

export class SignIn extends Component {
  onSubmit = data => {
    this.props.login_account(data);
    localStorage.setItem('ID', JSON.stringify(data));
  };

  render() {
    return (
      <React.Fragment>
        <Navbar transparent />
        <Login onSubmit={this.onSubmit} />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { login_account }
)(SignIn);
