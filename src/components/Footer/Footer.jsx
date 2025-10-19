import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="es-footer">
      <div className="es-footer-inner container">
        <div className="es-top row gy-4">
          <div className="col-md-4 d-flex flex-column justify-content-start">
            <div className="brand-wrap">
              <h3 className="brand-title">Ersatz Sports Hub</h3>
              <p className="brand-sub">Gear. Passion. Performance.</p>
            </div>

            <p className="brand-desc">
              Premium sports equipment for athletes and enthusiasts. Quality products, fast delivery and friendly support.
            </p>

            <div className="socials mt-3" aria-hidden="false">
              <a href="/" className="social" aria-label="Facebook">
                {/* facebook svg */}
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12a10 10 0 10-11.6 9.9v-7h-2.2V12h2.2V9.2c0-2.2 1.3-3.4 3.3-3.4.95 0 1.94.17 1.94.17v2.1h-1.08c-1.06 0-1.39.66-1.39 1.33V12h2.36l-.38 2.9h-1.98v7A10 10 0 0022 12z"/></svg>
              </a>
              <a href="/" className="social" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A3.8 3.8 0 1015.8 12 3.8 3.8 0 0012 8.2zm6.2-.9a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1zM12 9.5A2.5 2.5 0 1114.5 12 2.5 2.5 0 0112 9.5z"/></svg>
              </a>
              <a href="/" className="social" aria-label="X / Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M22 5.92c-.64.28-1.32.48-2.04.56.73-.44 1.28-1.15 1.54-1.99-.68.4-1.43.7-2.22.86A3.43 3.43 0 0015.5 4c-1.9 0-3.44 1.56-3.44 3.48 0 .27.03.54.08.8C8.1 8.1 5.12 6.4 3.07 4.04c-.3.52-.47 1.12-.47 1.76 0 1.22.62 2.3 1.56 2.93-.58-.02-1.13-.18-1.61-.45v.05c0 1.7 1.2 3.12 2.8 3.45-.29.08-.6.12-.92.12-.23 0-.46-.02-.68-.06.47 1.44 1.83 2.48 3.45 2.51A6.9 6.9 0 012 19.54 9.74 9.74 0 009.78 22c6 0 9.28-5.02 9.28-9.38v-.43c.64-.46 1.18-1.03 1.6-1.68-.6.27-1.26.45-1.94.53z"/></svg>
              </a>
            </div>
          </div>

          <div className="col-md-2 col-6">
            <h6 className="col-title">Shop</h6>
            <ul className="footer-links list-unstyled">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=football">Football</Link></li>
              <li><Link to="/products?category=cricket">Cricket</Link></li>
              <li><Link to="/products?category=fitness">Fitness</Link></li>
            </ul>
          </div>

          <div className="col-md-2 col-6">
            <h6 className="col-title">Company</h6>
            <ul className="footer-links list-unstyled">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="col-title">Join our newsletter</h6>
            <p className="small text-muted">Get updates and exclusive offers — no spam.</p>

            <form className="newsletter d-flex" onSubmit={(e)=>e.preventDefault()}>
              <input type="email" className="form-control" placeholder="Your email" aria-label="Email"/>
              <button className="btn subscribe-btn" type="submit">Subscribe</button>
            </form>

            <div className="payments mt-3" aria-hidden="true">
              {/* placeholder payment icons */}
              <svg className="pay" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" fill="currentColor"/></svg>
              <svg className="pay" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="currentColor"/></svg>
              <svg className="pay" viewBox="0 0 24 24"><path d="M3 7h18v10H3z" fill="currentColor"/></svg>
            </div>
          </div>
        </div>

        <div className="es-bottom d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 pt-3">
          <small className="copyright">© {new Date().getFullYear()} Ersatz Sports Hub. All Rights Reserved.</small>
          <div className="foot-links mt-3 mt-md-0">
            <Link to="/privacy" className="me-3">Privacy</Link>
            <Link to="/shipping" className="me-3">Shipping</Link>
            <Link to="/returns">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;