import React from 'react';
import ProductDetail from './ProductDetail';

function index(props) {
  return (
    <div>
      <ProductDetail id={props.match.params.id} />
    </div>
  );
}

export default index;
