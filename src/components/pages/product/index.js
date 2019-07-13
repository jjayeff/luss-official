import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../../reducers/productReducer';
import ProductDetail from './ProductDetail';
import ProductSelect from './ProductSelect';
import Loader from '../../Loader';
import Navbar from '../../Navbar';
import './Product.css';
import ProductBreadcrumb from './ProductBreadcrumb';

export class Product extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    if (
      !this.props.product ||
      this.props.product.id !== Number(this.props.match.params.id)
    )
      return (
        <React.Fragment>
          <Navbar transparent />
          <Loader />
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <Navbar transparent />
        <section className="product">
          <div className="ui container">
            <ProductBreadcrumb product={this.props.product} />
            <div className="item-detail">
              <ProductDetail product={this.props.product} />
              <ProductSelect product={this.props.product} />
            </div>
          </div>
        </section>
      </React.Fragment>
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
)(Product);
