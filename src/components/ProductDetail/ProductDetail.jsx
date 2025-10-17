import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      <div className="product-detail-card p-4 shadow-lg rounded d-flex flex-wrap gap-4">
        {/* Product Image */}
        <div className="product-image flex-fill text-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        {/* Product Info */}
        <div className="product-info flex-fill">
          <h2 className="product-name mb-3">{product.name}</h2>
          <p className="mb-2"><strong>Brand:</strong> {product.brand}</p>
          <p className="mb-2"><strong>Category:</strong> {product.category}</p>
          <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
          <p className={`mb-2 stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
            <strong>Stock:</strong> {product.stock > 0 ? 'Available' : 'Out of Stock'}
          </p>
          <p className="mb-4"><strong>Description:</strong> {product.description}</p>

          {/* Action Buttons */}
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-gradient w-auto">Buy Now</button>
            <button className="btn btn-outline-gradient w-auto">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;