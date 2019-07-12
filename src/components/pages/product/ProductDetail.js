import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../../reducers/productReducer';
import Loader from '../../Loader';
import './ProductDetail.css';

export class ProductDetail extends Component {
  state = {
    img: null
  };

  componentDidMount() {
    this.props.fetchProduct(this.props.id);
  }
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
    if (!this.props.product || this.props.product.id !== Number(this.props.id))
      return <Loader />;
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

const mapStateToProps = (state, ownProps) => {
  return {
    product: state.products.product
  };
};

export default connect(
  mapStateToProps,
  { fetchProduct }
)(ProductDetail);
