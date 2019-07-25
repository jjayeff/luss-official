import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout_account } from '../reducers/authReducer';
import faker from 'faker';
import './Narbar.css';
import PopupExample from './core/Popup';

export class Navbar extends Component {
  onLogout() {
    localStorage.removeItem('Session');
    this.props.logout_account();
  }
  renderUser() {
    const userDetail = () => (
      <div className="ui middle aligned selection list">
        <div className="item">
          <i className="large user outline middle aligned icon" />
          <div className="content">
            <div className="header">My Account</div>
          </div>
        </div>
        <div className="item">
          <i className="large paper plane outline middle aligned icon" />
          <div className="content">
            <div className="header">My Order</div>
          </div>
        </div>
        <div
          className="item"
          style={{ cursor: 'pointer' }}
          onClick={() => this.onLogout()}
        >
          <i className="large sign-out middle aligned icon" />
          <div className="content">
            <div className="header">Logout</div>
          </div>
        </div>
      </div>
    );
    if (this.props.user)
      return (
        <PopupExample
          content={userDetail}
          trigger={
            <div className="item" style={{ cursor: 'pointer' }}>
              <img
                className="ui avatar image"
                src={faker.image.avatar()}
                alt=""
              />
              <span style={{ textTransform: 'capitalize' }}>
                {this.props.user.firstName}
              </span>
            </div>
          }
          position="bottom right"
          hoverable
        />
      );
    else
      return (
        <Link to="/account/login" className="item">
          <i className="unlock icon" />
        </Link>
      );
  }
  renderCartContent() {
    return this.props.carts.map((cart, i) => {
      if (i > 4) return <div key={i} />;
      return (
        <div className="pop-up-item" key={i}>
          <div className="left">
            <img src={cart.detail.img_0} alt="" style={{ height: '40px' }} />
            <div className="detail">
              <p>
                <b>{cart.detail.name}</b>
                <br />
                {cart.detail.color} ({cart.size})
              </p>
            </div>
          </div>
          <div className="right">
            <p>
              <b>฿{cart.detail.price}</b>
              <br />
              <a href="#!">ลบ</a>
            </p>
          </div>
        </div>
      );
    });
  }
  render() {
    const cart = (
      <div className="pop-up-items">
        <div className="header">สินค้าที่เพิ่งเพิ่มไปใน</div>
        <div className="content">{this.renderCartContent()}</div>
        <div className="footer">
          <p>
            {this.props.carts.length > 5 ? this.props.carts.length - 5 : 0}{' '}
            สินค้าในตระกร้า
          </p>
          <Link to="/cart" className="mini ui button red">
            ดูรถเข็นทั้งหมด
          </Link>
        </div>
      </div>
    );
    return (
      <header className={this.props.transparent ? '' : 'main-header'}>
        <div className={this.props.transparent ? 'black' : ''}>
          <div
            className={`ui container large secondary pointing menu ${
              this.props.transparent ? 'inverted' : ''
            }`}
          >
            <NavLink exact to="/" className="item">
              Home
            </NavLink>
            <NavLink to="/products" className="item">
              Produsts
            </NavLink>
            <NavLink to="/payment" className="item">
              Confirm Payment
            </NavLink>
            <div className="right menu">
              <PopupExample
                content={cart}
                trigger={
                  <Link to="/cart" className="item">
                    <i className="shopping cart icon" />
                    <p className="cart-number-badge">
                      {this.props.carts.length}
                    </p>
                  </Link>
                }
                position="bottom right"
                hoverable
              />
              {this.renderUser()}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    carts: state.products.carts,
    cart: state.products.cart
  };
};

export default connect(
  mapStateToProps,
  { logout_account }
)(Navbar);
