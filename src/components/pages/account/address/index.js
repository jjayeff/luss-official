import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../../../Navbar';
import Address from './Address';

export class index extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar transparent />
        <Address user={this.props.user} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(index);
