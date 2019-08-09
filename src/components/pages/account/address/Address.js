import React, { Component } from 'react';
import './Address.css';
import Sidebar from '../Sidebar';
import Content from './Content';

export class Address extends Component {
  render() {
    return (
      <section className="address">
        <div className="ui container">
          <div className="grid-container">
            <div className="userpage-sidebar">
              <Sidebar user={this.props.user} selected="ที่อยู่" />
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

export default Address;
