import React from 'react';
import './Footer.css'; // Import the CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Contact Information */}
          <div className="col-md-4">
            <h4>Contact Information</h4>
            <p>
              <strong>Email:</strong> info@algowise.com<br />
              <strong>Phone:</strong> +1 (123) 456-7890<br />
              <strong>Address:</strong> 123 AlgoWise Street, Tech City, TC 12345
            </p>
          </div>

          {/* Important Links */}
          <div className="col-md-4">
            <h4>Important Links</h4>
            <ul>
              <li><a href="#about-us">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-of-service">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
            <h4>Follow Us</h4>
            <div className="social-media-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
