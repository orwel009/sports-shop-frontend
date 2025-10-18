import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="product-card">
      {/* Product Image */}
      <div className="product-image-wrapper">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
        />
        {product.stock === 0 && (
          <span className="out-of-stock">Out of Stock</span>
        )}
      </div>

      {/* Product Details */}
      <div className="card-body">
        <p className="card-brand ms-3">{product.brand}</p>
        <h5 className="card-title ms-3">{product.name}</h5>
        <p className="card-price ms-3">${product.price.toFixed(2)}</p>
        <p
          className={`card-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'} ms-3`}
        >
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;