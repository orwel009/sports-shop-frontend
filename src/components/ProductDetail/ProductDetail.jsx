import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import "./ProductDetail.css";

const ProductDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const onBuyNow = ()=>{
    const token = localStorage.getItem("token")
    if(!token){
      alert("Login to continue")
      navigate('/login')
      return
    }
    alert("Buy Now")
  }
  const onAddToCart = ()=>{
    const token = localStorage.getItem("token")
    if(!token){
      alert("Login to continue")
      navigate('/login')
      return
    }
    alert("Added to Cart")
  }

  if (!product)
    return <div className="loading-screen">Loading product details...</div>;

  return (
    <div className="container product-detail-container py-5">
      <div className="product-detail-card shadow-lg rounded-4 overflow-hidden">
        <div className="row g-0">
          {/* Left: Product Image */}
          <div className="col-md-6 product-image-section d-flex align-items-center justify-content-center">
            <img
              src={product.images[0]}
              alt={product.name}
              className="img-fluid rounded-3 product-detail-image"
            />
          </div>

          {/* Right: Product Info */}
          <div className="col-md-6 product-info-section p-5">
            <h2 className="product-name mb-3">{product.name}</h2>
            <p className="text-muted mb-1">Brand: <span>{product.brand}</span></p>
            <p className="text-muted mb-1">Category: <span>{product.category}</span></p>
            <p className="product-price mt-3 mb-3">${product.price}</p>

            <p
              className={`stock-status ${product.stock > 0 ? "in-stock" : "out-stock"
                }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <p className="product-description mt-4">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="action-buttons mt-4 d-flex flex-wrap gap-3">
              <button className="btn btn-gradient px-4 py-2" 
                onClick={() => onBuyNow(product)}
                disabled={product.stock === 0}>
                <i className="bi bi-bag-fill me-2"></i> Buy Now
              </button>
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
      </div>
    </div>
  );
};

export default ProductDetail;