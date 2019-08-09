import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout_account } from '../../../reducers/authReducer';
import faker from 'faker';
import history from '../../../history';
import './Sidebar.css';

export class Sidebar extends Component {
  state = {
    lists: [
      {
        name: 'ประวัติ',
        icon: 'user outline',
        link: '/account/profile'
      },
      {
        name: 'ที่อยู่',
        icon: 'address book outline',
        link: '/account/address'
      },
      {
        name: 'การซื้อของฉัน',
        icon: 'paper plane outline',
        link: '/account/profile'
      },
      {
        name: 'ตั้งค่ารหัสผ่าน',
        icon: 'key',
        link: '/account/password'
      },
      {
        name: 'ออกจากระบบ',
        icon: 'sign-out',
        link: null
      }
    ],
    listSelect: 'ประวัติ'
  };

  componentDidMount() {
    this.setState({ listSelect: this.props.selected });
  }

  onLogout() {
    localStorage.removeItem('Session');
    this.props.logout_account();
  }

  renderLists() {
    return this.state.lists.map(list => {
      return (
        <div
          className="item"
          onClick={() =>
            list.link ? history.push(list.link) : this.onLogout()
          }
          key={list.name}
        >
          <i className={`large ${list.icon} middle aligned icon`} />
          <div className="content">
            <div className="header">
              <p
                className={`kanit ${
                  this.state.listSelect === list.name ? 'active' : ''
                }`}
              >
                {list.name}
              </p>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="ui middle aligned list">
          <div className="item">
            <img className="ui tiny image" src={faker.image.avatar()} alt="" />
            <div className="content">
              <h4 className="header">
                {this.props.user ? this.props.user.firstName : 'User'}
              </h4>
              <div
                className="description"
                style={{ cursor: 'pointer' }}
                onClick={() => history.push('/account/profile')}
              >
                <p className="kanit">
                  <i className="edit outline aligned icon" />
                  แก้ไขข้อมูลส่วนตัว
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ui middle aligned selection list">
          {this.renderLists()}
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { logout_account }
)(Sidebar);
