import React, { Component } from 'react';
import './ProductSelect.css';

export class ProductSelect extends Component {
  render() {
    return (
      <div className="item-select">
        <h2 className="ui header">{this.props.product.name}</h2>
        <h3>฿{this.props.product.price}</h3>
        <p>{this.props.product.color}</p>
        <div>size: {this.props.product.size}</div>
        <a href="#!">+</a>
        <a href="#!">1</a>
        <a href="#!">-</a>
        <div className="ui labeled button" tabIndex="0">
          <div className="ui red button">
            <i className="cart shopping icon" /> เพิ่มในยังรถเข็น
          </div>
          <p className="ui basic red left pointing label">1,048</p>
        </div>
        <button className="circular ui icon button">
          <i className="heart icon" />
        </button>
      </div>
    );
  }
}

export default ProductSelect;
