import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../../Navbar';
import Signup from './Signup';

export class SignIn extends Component {
  onSubmit = formValues => {
    console.log(formValues);
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

export default connect(null)(SignIn);
