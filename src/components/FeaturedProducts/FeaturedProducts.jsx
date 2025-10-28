import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import API from "../../services/api";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get("/products/featured");
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading)
    return <div className="text-center py-5">Loading featured products...</div>;

  if (products.length === 0)
    return (
      <section className="featured-products container py-5">
        <h2 className="text-center mb-4">Trending Products</h2>
        <p className="text-center text-muted">No featured products available.</p>
      </section>
    );

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