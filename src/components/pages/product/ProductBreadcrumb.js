import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductBreadcrumb({ product }) {
  return (
    <div className="ui top attached header" style={{ marginTop: '10px' }}>
      <div className="ui breadcrumb">
        <Link to="/" className="section">
          LUSS Official
        </Link>
        <i className="right angle icon divider" />
        <Link to="/products" className="section">
          Store
        </Link>
        <i className="right angle icon divider" />
        <Link to="/products" className="section">
          {product.type}
        </Link>
        <i className="right angle icon divider" />
        <div className="active section">{product.name}</div>
      </div>
    </div>
  );
}
