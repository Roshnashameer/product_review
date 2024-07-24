import React from 'react';
import { Mail } from 'react-feather';
import { Link } from 'react-router-dom';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="bg-primary text-white mt-5 p-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-4">
            <h3>ShopWithTrends</h3>
            <p>Completely Free App to Explore Products</p>
            <p>
              For any Query <Mail className="ms-2 me-2" /> contact@shopwithtrends.com
            </p>
          </div>
          <div className="col-md-3 mb-4">
            <h3>Links</h3>
            <Link to="/" className="d-block text-white" style={{ textDecoration: 'none' }}>
              Home
            </Link>
            <Link to="/login" className="d-block text-white" style={{ textDecoration: 'none' }}>
              Login
            </Link>
            <Link to="/signup" className="d-block text-white" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </div>
          <div className="col-md-3 mb-4">
            <h3>Guides</h3>
            <h5>React</h5>
            <h5>React Bootstrap</h5>
            <h5>Routing</h5>
          </div>
          <div className="col-md-3">
            <h3>Contact Us</h3>
            <div className="input-group mb-3">
              <input
                type="email"
                placeholder="Enter email"
                className="form-control"
              />
              <button className="btn btn-secondary">
                Send
              </button>
            </div>
            <div className="mt-3">
              <i className="fab fa-github ms-3"></i>
              <i className="fab fa-linkedin ms-3"></i>
              <i className="fab fa-facebook ms-3"></i>
              <i className="fab fa-instagram ms-3"></i>
              <i className="fab fa-twitter ms-3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;