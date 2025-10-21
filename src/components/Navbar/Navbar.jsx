import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Tokens from localStorage
  const userToken = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  // Logout handlers
  const handleUserLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <nav className="navbar custom-navbar navbar-expand-lg shadow-sm">
      <div className="container">

        <Link className="navbar-brand custom-brand" to={adminToken ? "/admin/dashboard" : "/"}>
          <img src="/images/logo.png" alt="Online Sports Store" className="logo" />
          <span className="brand-name">Online Sports Store</span>
        </Link>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* Non-logged-in Users */}
            {!userToken && !adminToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn login-btn ms-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn reg-btn ms-2" to="/register">Register</Link>
                </li>
              </>
            )}

            {/* Logged-in Normal Users */}
            {userToken && !adminToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/orders">Orders</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn logout-btn ms-2" onClick={handleUserLogout}>Logout</button>
                </li>
              </>
            )}

            {/* Admin Users */}
            {adminToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/admin/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/admin/products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/admin/orders">Orders</Link>
                </li>
                <li className="nav-item">
                  <button className="btn logout-btn ms-2" onClick={handleAdminLogout}>Logout</button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;