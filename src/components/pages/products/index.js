import React, { Component } from 'react';
import ProductsList from './ProductsList';
import Navbar from '../../Navbar';

export class index extends Component {
  componentDidMount() {
    document.title = 'Luss Official | Products';
  }

  render() {
    return (
      <React.Fragment>
        <Navbar transparent />
        <ProductsList />
      </React.Fragment>
    );
  }
}

export default index;
