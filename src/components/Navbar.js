import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Narbar.css';
import PopupExample from './core/Popup';

export class Navbar extends Component {
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
          <button className="mini ui button red">ดูรถเข็นทั้งหมด</button>
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
                  <NavLink to="/cart" className="item">
                    <i className="shopping cart icon" />
                    <p className="cart-number-badge">
                      {this.props.carts.length}
                    </p>
                  </NavLink>
                }
                position="bottom right"
                hoverable
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    carts: state.products.carts,
    cart: state.products.cart
  };
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
