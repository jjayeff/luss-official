import React, { Component } from 'react';
import './Password.css';
import Sidebar from '../Sidebar';
import Content from './Content';

export class Password extends Component {
  render() {
    return (
      <section className="password">
        <div className="ui container">
          <div className="grid-container">
            <div className="userpage-sidebar">
              <Sidebar user={this.props.user} selected="ตั้งค่ารหัสผ่าน" />
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

export default Password;
