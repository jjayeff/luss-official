import React, { Component } from 'react';
import './Profile.css';
import Sidebar from '../Sidebar';
import Content from './Content';

export class Profile extends Component {
  render() {
    return (
      <section className="profile">
        <div className="ui container">
          <div className="grid-container">
            <div className="userpage-sidebar">
              <Sidebar user={this.props.user} selected="ประวัติ" />
            </div>
            <div className="userpage-content">
              <Content user={this.props.user} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
