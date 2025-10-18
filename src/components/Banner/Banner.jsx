import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

const slides = [
  {
    image: "/images/banner/football.jpg",
    text: "Exclusive Football Gear Collection!",
  },
  {
    image: "/images/banner/badminton.jpg",
    text: "Gear Up for Champions — Shop the Best Equipment!",
  },
  {
    image: "/images/banner/cricket.jpg",
    text: "Where Performance Meets Passion in Sports!",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Manual slide handlers
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="banner">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`banner-slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="banner-content">
            <h2>{slide.text}</h2>
            <Link to="/products" className="btn-shop">
              Shop Now
            </Link>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button className="arrow left-arrow" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="arrow right-arrow" onClick={nextSlide}>
        &#10095;
      </button>
    </section>
  );
};

export default Banner;