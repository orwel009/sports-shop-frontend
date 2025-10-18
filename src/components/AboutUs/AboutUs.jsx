import React from "react";
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold">About Ersatz Sports Hub</h1>
          <p className="lead">Empowering athletes with quality equipment & unmatched passion</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/images/aboutus.jpg"
              alt="Our Story"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold mb-3 text-primary">Our Story</h2>
            <p>
              Ersatz Sports Hub started with a simple goal: to provide top-quality sports gear for everyone,
              from beginners to professional athletes. Our commitment to excellence and customer satisfaction
              drives us every day.
            </p>
            <p>
              We carefully curate our products, combining performance, durability, and style so that every
              customer can achieve their personal best.
            </p>
            <a href="/products" className="btn btn-primary btn-lg mt-3">Explore Products</a>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-5">Our Core Values</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <i className="bi bi-basket2-fill display-4 text-primary mb-3"></i>
              <h5 className="fw-bold">Quality</h5>
              <p>We ensure that all products meet the highest standards of performance and durability.</p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-people-fill display-4 text-primary mb-3"></i>
              <h5 className="fw-bold">Customer Focus</h5>
              <p>Our customers are at the heart of everything we do, guiding our decisions and improvements.</p>
            </div>
            <div className="col-md-4 mb-4">
              <i className="bi bi-lightning-fill display-4 text-primary mb-3"></i>
              <h5 className="fw-bold">Innovation</h5>
              <p>We continuously innovate to provide new solutions and a better sports experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 text-center text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h3 className="fw-bold">500+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="col-md-4 mb-4">
              <h3 className="fw-bold">150+</h3>
              <p>Products Available</p>
            </div>
            <div className="col-md-4 mb-4">
              <h3 className="fw-bold">5+</h3>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;