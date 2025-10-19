import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner/Banner';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import API from '../services/api';
import ProductCard from '../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import AboutUs from '../components/AboutUs/AboutUs';
import CustomerReview from '../components/CustomerReview/CustomerReview';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        const products = res.data;
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setAllProducts(shuffled.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Banner />
      <FeaturedProducts />

      <section className="all-products-home py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-5" style={{ fontSize: "2rem", color: "#333" }}>
            All Products
          </h2>

          <div className="row justify-content-center g-4">
            {allProducts.map((p) => (
              <div key={p._id} className="col-6 col-md-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="btn mt-4"
            style={{
              padding: "12px 28px",
              fontWeight: 600,
              fontSize: "1rem",
              color: "#fff",
              background: "linear-gradient(90deg, #007bff, #00c6ff)",
              borderRadius: "50px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            Show More
          </Link>
        </div>
      </section>

      <AboutUs/>
      <CustomerReview/>
      <Footer/>
    </>
  );
};

export default Home;