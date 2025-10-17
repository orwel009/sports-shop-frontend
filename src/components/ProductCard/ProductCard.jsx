import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card card m-2 shadow-sm h-100 d-flex flex-column">
      {/* Product Image */}
      <div className="product-image-wrapper">
        <img
          src={product.images[0]}
          className="card-img-top product-image"
          alt={product.name}
        />
        {product.stock === 0 && <span className="badge out-of-stock">Out of Stock</span>}
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-price">${product.price.toFixed(2)}</p>
          <p className={`card-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>

        {/* Buttons */}
        <div className="button-group mt-3">
          <Link to={`/products/${product._id}`} className="btn btn-primary btn-view">
            View Details
          </Link>
          <button
            className="btn btn-success btn-add"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;