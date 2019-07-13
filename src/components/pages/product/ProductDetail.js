import React, { Component } from 'react';
import './ProductDetail.css';

export class ProductDetail extends Component {
  state = {
    img: null
  };

  renderImage(img) {
    if (img !== 'null')
      return (
        <img
          className="select-img ui image"
          src={img}
          alt={this.props.product.name}
          onMouseEnter={() => {
            this.setState({
              img
            });
          }}
        />
      );
  }

  render() {
    return (
      <div>
        <div className="ui tiny images centered">
          {this.renderImage(this.props.product.img_0)}
          {this.renderImage(this.props.product.img_1)}
          {this.renderImage(this.props.product.img_2)}
          {this.renderImage(this.props.product.img_3)}
          {this.renderImage(this.props.product.img_4)}
          {this.renderImage(this.props.product.img_5)}
        </div>
        <img
          className="ui image"
          src={this.state.img ? this.state.img : this.props.product.img_0}
          alt={this.props.product.name}
        />
      </div>
    );
  }
}

export default ProductDetail;
