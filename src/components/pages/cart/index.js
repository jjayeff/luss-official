import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editCart } from '../../../reducers/productReducer';
import CartList from './CartList';
import Navbar from '../../Navbar';

export class Cart extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar transparent />
        <CartList carts={this.props.carts} editCart={this.props.editCart} />
      </React.Fragment>
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
  { editCart }
)(Cart);
