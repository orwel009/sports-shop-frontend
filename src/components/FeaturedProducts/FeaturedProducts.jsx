import React from "react";
import ProductCard from "../ProductCard/ProductCard";

// Sample products data
const products = [
    {
        _id: "1",
        brand: "Adidas",
        name: "Football Pro",
        price: 49.99,
        images: ["/images/featuredProducts/adidas-ball.jpg"],
        stock: 10,
    },
    {
        _id: "2",
        brand: "Yonex",
        name: "Shaker Bottle",
        price: 29.99,
        images: ["/images/featuredProducts/shaker.jpg"],
        stock: 0,
    },
    {
        _id: "3",
        brand: "Nike",
        name: "Football Jersey",
        price: 7.99,
        images: ["/images/featuredProducts/jersey.jpg"],
        stock: 5,
    },
    {
        _id: "4",
        brand: "Captian",
        name: "Gym GLove",
        price: 9.99,
        images: ["/images/featuredProducts/nike-boot.jpg"],
        stock: 12,
    },
];

const FeaturedProducts = () => {
    return (
        <section className="featured-products container py-5">
            <h2 className="text-center mb-4">Trending Products</h2>
            <div className="row row-cols-2 row-cols-lg-4 g-4">
                {products.map((product) => (
                    <div key={product._id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

        </section>
    );
};

export default FeaturedProducts;