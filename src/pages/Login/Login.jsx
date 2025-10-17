import React, { useState } from 'react';
import API from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-page d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow-lg rounded">
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEfyTOrvRFGeFD5MAQ3m77YoTWnoQlp_lH1Q&s"
            alt="Logo"
            className="login-logo mb-2"
          />
          <h3 className="login-title">Welcome Back</h3>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="btn btn-gradient w-100 mb-3">
            Login
          </button>
        </form>

        {/* Links */}
        <div className="text-center mb-2">
          <Link to="/forgot-password" className="link-secondary">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="link-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;