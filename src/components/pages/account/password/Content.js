import React, { Component } from 'react';
import PasswordForm from './PasswordForm';

export class Content extends Component {
  render() {
    return (
      <div className="ui attached segment">
        <h3 className="kanit">#ตั้งค่ารหัสผ่าน</h3>
        <hr />
        <PasswordForm user={this.props.user} />
      </div>
    );
  }
}

export default Content;
