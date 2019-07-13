import React, { Component } from 'react';
import './ProductSelect.css';

export class ProductSelect extends Component {
  state = {
    color: this.props.product.color,
    delivery: 'Free',
    size: null,
    quantity: 1
  };

  colorCheck(var1, var2) {
    if (var1 === var2) return 'red';
  }

  renderSize() {
    const { size } = this.props.product;
    var array = size.split(',');
    return array.map((value, i) => {
      return (
        <button
          key={i}
          className={`ui basic button ${this.colorCheck(
            value,
            this.state.size
          )}`}
          onClick={() => this.setState({ size: value })}
        >
          {value}
        </button>
      );
    });
  }

  render() {
    return (
      <div>
        <h3 className="ui top attached header">{this.props.product.name}</h3>
        <div className="ui attached segment product-content-detail">
          <div className="ui horizontal statistics">
            <div className="statistic">
              <div className="value">฿{this.props.product.price}</div>
              <div className="label price-sale">
                ฿{this.props.product.price + this.props.product.price * 0.2}
              </div>
              <p className="ui red tag label">20% Sale</p>
            </div>
          </div>
          <div className="content">
            <label>
              Color<span className="ui red header">*</span>
            </label>
            <button
              className={`ui basic button ${this.colorCheck(
                this.props.product.color,
                this.state.color
              )}`}
              onClick={() => this.setState({ color: this.props.product.color })}
            >
              {this.props.product.color}
            </button>
          </div>
          <div className="content">
            <label>
              Delivery<span className="ui red header">*</span>
            </label>
            <button
              className={`ui basic button ${this.colorCheck(
                'Free',
                this.state.delivery
              )}`}
              onClick={() => this.setState({ delivery: 'Free' })}
            >
              <i className="truck icon" />
              Free
            </button>
            <button
              className={`ui basic button ${this.colorCheck(
                'EMS',
                this.state.delivery
              )}`}
              onClick={() => this.setState({ delivery: 'EMS' })}
            >
              <i className="shipping fast icon" />
              EMS 50 BATH
            </button>
          </div>
          <div className="content">
            <label>
              Size <span className="ui red header">*</span>
            </label>
            {this.renderSize()}
          </div>
          <div className="quantity">
            <label className="title">Quantity</label>
            <button
              className="circular ui basic icon button"
              onClick={() =>
                this.setState({
                  quantity:
                    this.state.quantity <= 1
                      ? this.state.quantity
                      : this.state.quantity - 1
                })
              }
            >
              <i className="minus icon" />
            </button>
            <label>{this.state.quantity}</label>
            <button
              className="circular ui basic icon button"
              onClick={() =>
                this.setState({
                  quantity:
                    this.state.quantity >= 99
                      ? this.state.quantity
                      : this.state.quantity + 1
                })
              }
            >
              <i className="plus icon" />
            </button>

            <label className="title">64 pieces available</label>
          </div>
        </div>
        <div className="ui bottom attached segment product-center">
          <button className="ui button red">
            <i className="cart shopping icon" />
            Add on Cart
          </button>
          <div className="ui labeled button" tabIndex="0">
            <div className="ui black button">
              <i className="heart icon" /> Favorite
            </div>
            <p className="ui basic left pointing black label">1,048</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSelect;
