import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAPI from '../../services/adminApi';

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    description: '',
    imagesFiles: [],
    isFeatured: false,
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // Fetch categories and brands
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          adminAPI.get('/products/categories'),
          adminAPI.get('/products/brands'),
        ]);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFilters();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setFormData({ ...formData, imagesFiles: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Delete a selected image before submission
  const handleDeleteImage = (index) => {
    const updatedFiles = [...formData.imagesFiles];
    updatedFiles.splice(index, 1);

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);

    setFormData({ ...formData, imagesFiles: updatedFiles });
    setPreviewImages(updatedPreviews);
  };

  // Add new brand or category
  const handleAddNewBrand = () => {
    if (newBrand.trim() !== '') {
      setBrands([...brands, newBrand.trim()]);
      setFormData({ ...formData, brand: newBrand.trim() });
      setNewBrand('');
    }
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory.trim()]);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory('');
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imagesFiles || formData.imagesFiles.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('brand', formData.brand);
      data.append('stock', formData.stock);
      data.append('description', formData.description);
      data.append('isFeatured', formData.isFeatured); // ✅ send as string ("true"/"false")

      formData.imagesFiles.forEach((file) => data.append('images', file));

      const res = await adminAPI.post('/products', data);
      console.log(res.data);

      alert('Product added successfully!');
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Add New Product</h3>
      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="row">
          {/* Product Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Brand */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Brand</label>
            <div className="d-flex gap-2">
              <select
                className="form-select"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              >
                <option value="">Select Brand</option>
                {brands.map((b, i) => (
                  <option key={i} value={b}>{b}</option>
                ))}
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="New Brand"
                value={newBrand}
                onChange={(e) => setNewBrand(e.target.value)}
              />
              <button type="button" className="btn btn-outline-primary" onClick={handleAddNewBrand}>
                Add
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>
            <div className="d-flex gap-2">
              <select
                className="form-select"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button type="button" className="btn btn-outline-primary" onClick={handleAddNewCategory}>
                Add
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Stock */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          {/* Is Featured Toggle */}
          <div className="col-md-6 mb-3 d-flex align-items-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                id="isFeaturedSwitch"
              />
              <label className="form-check-label" htmlFor="isFeaturedSwitch">
                Mark as Featured Product
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Images */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Upload Images (Max 5)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          {/* Image Previews */}
          {previewImages.length > 0 && (
            <div className="col-md-12 mb-3">
              <div className="d-flex flex-wrap gap-3">
                {previewImages.map((src, i) => (
                  <div key={i} className="position-relative">
                    <img
                      src={src}
                      alt={`Preview ${i}`}
                      className="img-thumbnail"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={() => handleDeleteImage(i)}
                      style={{ transform: 'translate(50%, -50%)' }}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;