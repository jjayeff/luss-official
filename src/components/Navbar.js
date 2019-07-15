import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Narbar.css';
import PopupExample from './core/Popup';

export class Navbar extends Component {
  state = {};
  render() {
    const cart = (
      <div className="pop-up-items">
        <div className="header">สินค้าที่เพิ่งเพิ่มไปใน</div>
        <div className="content">
          <div className="pop-up-item">
            <div className="left">
              <img src="/img/blog1.jpg" alt="" style={{ height: '40px' }} />
              <div className="detail">
                <p>
                  <b>Preorder Adidas Falcon แท้</b>
                  <br />
                  ตัวเลือกสินค้า: 7.5-9.5UK,ขาวลิซ่า
                </p>
              </div>
            </div>
            <div className="right">
              <p>
                <b>฿3,690</b>
                <br />
                <a href="#!">ลบ</a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>2 สินค้าในตระกร้า</p>
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
                  <Link to="/" className="item">
                    <i className="shopping cart icon" />
                    <p className="shopee-cart-number-badge">1</p>
                  </Link>
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

export default Navbar;
