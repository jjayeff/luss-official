import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../../../reducers/authReducer';
import ProfileForm from './ProfileForm';

export class Content extends Component {
  onSubmit = formValues => {
    this.props.fetchUser(this.props.accessToken);
  };

  render() {
    return (
      <div className="ui attached segment">
        <h3 className="kanit">#ข้อมูลส่วนตัว</h3>
        <hr />
        <ProfileForm onSubmit={this.onSubmit} user={this.props.user} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.auth.accessToken
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(Content);
