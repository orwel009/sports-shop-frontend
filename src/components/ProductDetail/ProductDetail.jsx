import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import "./ProductDetail.css";
import Footer from '../Footer/Footer'
import CustomerReview from '../CustomerReview/CustomerReview'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';


const ProductDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const onBuyNow = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to proceed with your purchase.");
      navigate("/login");
      return;
    }

    // Temporarily clear cart state for isolated buy-now purchase
    localStorage.setItem("buyNowProduct", JSON.stringify(product));

    // Navigate to checkout but only for this item
    navigate("/checkout", { state: { buyNow: true, product } });
  };


  const onAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login to continue");
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
    alert("Product added to cart!");
  };


  if (!product)
    return <div className="loading-screen">Loading product details...</div>;

  return (
    <>
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

              <p className={`stock-status ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>

              {/* Product Description */}
              <div className="product-description-section mt-4">
                <h5 className="description-title mb-2">Product Description</h5>
                <p className="product-description">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons mt-4 d-flex flex-wrap gap-3">
                <button 
                  className="btn btn-gradient px-4 py-2" 
                  onClick={() => onBuyNow(product)}
                  disabled={product.stock === 0}
                >
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
      <CustomerReview/>
      <Footer />
    </>
  );
};

export default ProductDetail;