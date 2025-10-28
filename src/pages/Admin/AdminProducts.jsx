import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adminAPI from "../../services/adminApi";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await adminAPI.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await adminAPI.delete(`/products/${id}`);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <Link to="/admin/add-product" className="btn btn-primary">
          <i className="fa fa-plus me-2"></i>Add Product
        </Link>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      {product.images && product.images.length > 0 ? (
                        product.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={product.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ddd",
                            }}
                          />
                        ))
                      ) : (
                        <span className="text-muted">No Images</span>
                      )}
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;