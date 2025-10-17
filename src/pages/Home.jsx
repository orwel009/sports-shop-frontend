import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome to Dental Shop</h1>
      <p>Browse our products and find the perfect item.</p>
      <Link to="/products" className="btn btn-primary">
        Shop Now
      </Link>
    </div>
  );
};

export default Home;