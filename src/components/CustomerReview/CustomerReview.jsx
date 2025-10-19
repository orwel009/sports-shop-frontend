import React from "react";
import Slider from "react-slick";
import "./CustomerReview.css";

const CustomerReview = () => {
  const reviews = [
    {
      name: "Arjun Nair",
      review:
        "Amazing quality! The football gear I ordered feels premium and fits perfectly. Totally worth it!",
      rating: 5,
    },
    {
      name: "Sneha Varma",
      review:
        "Loved the variety of products available. Customer service was very responsive and polite!",
      rating: 5,
    },
    {
      name: "Rohan Thomas",
      review:
        "Received my badminton racquet within two days. The packaging was excellent!",
      rating: 4,
    },
    {
      name: "Divya Menon",
      review:
        "Great experience overall. The shoes I bought are super comfortable and stylish.",
      rating: 5,
    },
    {
      name: "Kiran Das",
      review:
        "Website is very easy to navigate. I found exactly what I needed for my cricket practice.",
      rating: 4,
    },
    {
      name: "Alan Mathew",
      review:
        "Loved the fast delivery! I’ll definitely shop here again for all my sports needs.",
      rating: 5,
    },
    {
      name: "Priya Krishnan",
      review:
        "Products are genuine and high-quality. The offers make it even better!",
      rating: 5,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="customer-reviews py-5 text-center">
      <div className="container">
        <h2 className="mb-4 fw-bold">What Our Customers Say</h2>
        <Slider {...settings}>
          {reviews.map((r, i) => (
            <div key={i} className="p-3">
              <div className="review-card p-4 shadow-sm">
                <div className="stars mb-2">
                  {"⭐".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                </div>
                <p className="review-text">"{r.review}"</p>
                <h6 className="reviewer-name mt-3 fw-bold">{r.name}</h6>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CustomerReview;