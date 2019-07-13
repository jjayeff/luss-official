import React, { Component } from 'react';
import Navbar from '../../Navbar';
import PaymentForm from './PaymentForm';

export class index extends Component {
  onSubmit = formValues => {
    console.log(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <Navbar transparent />
        <PaymentForm onSubmit={this.onSubmit} />
      </React.Fragment>
    );
  }
}

export default index;
