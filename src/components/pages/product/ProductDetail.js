import React, { Component } from 'react';
import './ProductDetail.css';

export class ProductDetail extends Component {
  componentDidMount() {
    document.title = `${this.props.product.name} | Luss Official`;
  }

  state = { img: null };

  renderImage(img, i) {
    if (img !== 'null')
      return (
        <img
          key={i}
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
    const imgs = [
      this.props.product.img_0,
      this.props.product.img_1,
      this.props.product.img_2,
      this.props.product.img_3,
      this.props.product.img_4,
      this.props.product.img_5
    ];
    return (
      <div className="image-detail">
        <div className="image-slide ui tiny images centered">
          {imgs.map((img, i) => this.renderImage(img, i))}
        </div>
        <img
          className="image-show"
          src={this.state.img ? this.state.img : this.props.product.img_0}
          alt={this.props.product.name}
        />
      </div>
    );
  }
}

export default ProductDetail;
