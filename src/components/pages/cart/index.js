import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editCart, deleteCart } from '../../../reducers/productReducer';
import CartList from './CartList';
import Navbar from '../../Navbar';

export class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar transparent />
        <CartList
          carts={this.props.carts}
          loading={this.props.loading}
          editCart={this.props.editCart}
          deleteCart={this.props.deleteCart}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    carts: state.products.carts,
    loading: state.products.loading
  };
};
export default connect(
  mapStateToProps,
  { editCart, deleteCart }
)(Cart);
