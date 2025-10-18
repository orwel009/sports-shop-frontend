import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch categories and brands once
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          API.get('/products/categories'),
          API.get('/products/brands'),
        ]);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFilters();
  }, []);

  // Fetch products whenever filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams(filters).toString();
        const res = await API.get(`/products?${params}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };
    fetchProducts();
  }, [filters]); // Only depends on filters now

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="product-list">
      {/* Filter Bar */}
      <div className="filter-bar d-flex flex-wrap align-items-end gap-3 mb-4 mt-2 ms-5 me-5">
        <div className="filter-item flex-fill">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="filter-item flex-fill">
          <label htmlFor="brand" className="form-label">Brand</label>
          <select
            id="brand"
            name="brand"
            value={filters.brand}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">All Brands</option>
            {brands.map((b, i) => (
              <option key={i} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="filter-item flex-fill">
          <label htmlFor="minPrice" className="form-label">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="form-control"
            min="0"
          />
        </div>

        <div className="filter-item flex-fill">
          <label htmlFor="maxPrice" className="form-label">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="form-control"
            min="0"
          />
        </div>

        <div className="filter-item flex-fill">
          <label htmlFor="search" className="form-label">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            className="form-control"
            placeholder="Search products..."
          />
        </div>

      </div>

      {/* Product Grid */}
      <div className="row m-2">
        {products.map((p) => (
          <div key={p._id} className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;