import React, { Component } from 'react';
import history from '../../../../history';
import { connect } from 'react-redux';
import { login_account, fetchUser } from '../../../../reducers/authReducer';
import { fetchCarts } from '../../../../reducers/productReducer';
import Login from './Login';
import Navbar from '../../../Navbar';

export class SignIn extends Component {
  onSubmit = data => {
    const { accessToken } = data;
    this.props.login_account(accessToken);
    this.props.fetchUser(accessToken);
    this.props.fetchCarts(accessToken);
    localStorage.setItem('Session', JSON.stringify(accessToken));
    history.push('/products');
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
  { login_account, fetchUser, fetchCarts }
)(SignIn);
