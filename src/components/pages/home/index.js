import React, { Component } from 'react';
import Navbar from '../../Navbar';
import Gallery from './Gallery';
import Blog from './Blog';

export class index extends Component {
  componentDidMount() {
    document.title = 'Luss Official | Home pages';
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Blog />
        <Gallery />
      </React.Fragment>
    );
  }
}

export default index;
