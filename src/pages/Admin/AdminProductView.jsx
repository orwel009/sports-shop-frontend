import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import adminAPI from '../../services/adminApi';

const AdminProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    description: '',
    images: [],
  });

  // Fetch product data
  const fetchProduct = useCallback(async () => {
    try {
      const res = await adminAPI.get(`/products/${id}`);
      setProduct(res.data);
      setFormData({
        name: res.data.name,
        price: res.data.price,
        category: res.data.category,
        brand: res.data.brand,
        stock: res.data.stock,
        description: res.data.description,
        images: res.data.images || [],
      });
    } catch (err) {
      console.error('Error fetching product', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'images') {
          formData.images.forEach((file) => data.append('images', file));
        } else {
          data.append(key, formData[key]);
        }
      });

      await adminAPI.put(`/products/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Product updated successfully!');
      setEditing(false);
      fetchProduct();
    } catch (err) {
      console.error('Error updating product', err);
      alert('Failed to update product.');
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminAPI.delete(`/products/${id}`);
        alert('🗑️ Product deleted successfully!');
        navigate('/admin/products');
      } catch (err) {
        console.error('Error deleting product', err);
        alert('Failed to delete product.');
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!product) return <div className="text-center mt-5">Product not found</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Product Details</h3>
        <div>
          {!editing ? (
            <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>
              Edit
            </button>
          ) : (
            <button className="btn btn-secondary me-2" onClick={() => setEditing(false)}>
              Cancel
            </button>
          )}
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {!editing ? (
        <div className="card p-3 shadow-sm">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={product.images?.[0] || '/images/no-image.png'}
                alt={product.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h4>{product.name}</h4>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Description:</strong> {product.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <form className="card p-4 shadow-sm" onSubmit={handleUpdate}>
          <div className="row">
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

            <div className="col-md-6 mb-3">
              <label className="form-label">Brand</label>
              <input
                type="text"
                className="form-control"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

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

            <div className="col-md-12 mb-3">
              <label className="form-label">Upload New Images</label>
              <input
                type="file"
                className="form-control"
                name="images"
                multiple
                onChange={handleImageChange}
              />
              {formData.images?.length > 0 && (
                <small className="text-muted">
                  {formData.images.length} file(s) selected
                </small>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminProductView;