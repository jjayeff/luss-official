import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';
import { createUser } from '../../../../reducers/authReducer';
import Navbar from '../../../Navbar';
import Signup from './Signup';

export class SignIn extends Component {
  onSubmit = formValues => {
    formValues.password = md5(formValues.password);
    this.props.createUser(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <Navbar transparent />
        <Signup onSubmit={this.onSubmit} />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { createUser }
)(SignIn);
