import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../../reducers/productReducer';
import './ProductsList.css';
import Loader from '../../Loader';

export class ProductsList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderImageList(product) {
    return product.img_1 !== 'null' ? (
      <React.Fragment>
        <img
          src={product.img_0}
          alt={product.Name}
          className="visible content"
        />
        <img
          src={product.img_1}
          alt={product.Name}
          className="hidden content"
        />
      </React.Fragment>
    ) : (
      <img src={product.img_0} alt={product.Name} className="content" />
    );
  }

  renderProductList() {
    return this.props.products.map(product => {
      return (
        <div key={product.id} className="ui card">
          <Link to={`/product/${product.id}`}>
            <div className="ui slide masked reveal image">
              {this.renderImageList(product)}
            </div>
          </Link>
          <div className="content">
            <Link to={`/product/${product.id}`} className="header">
              {product.name}
            </Link>
            <div className="meta">
              <span className="date">฿{product.price}</span>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (!this.props.products) return <Loader />;

    return (
      <section className="products">
        <div className="ui container">
          <div className="items">{this.renderProductList()}</div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products.productDb
  };
};

export default connect(
  mapStateToProps,
  { fetchProducts }
)(ProductsList);
