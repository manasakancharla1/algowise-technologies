import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import './Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user information from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/signin'); // Redirect to sign-in page after logout
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://thumbs.dreamstime.com/b/education-vector-logo-open-book-dictionary-textbook-notebook-graduation-hat-icon-modern-emblem-idea-concept-design-156632927.jpg"
              alt="AlgoWise Logo"
              style={{ height: '60px', width: 'auto' }} // Inline styles
            />
            <span style={{ fontSize: '30px', fontWeight: 'bold' }}>AlgoWise</span> {/* Inline styles for text */}
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/" style={{ color: 'white' }}>
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">
                  <i className="fas fa-heart"></i> About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/jobs">
                  <i className="fas fa-briefcase"></i> Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/courses">
                  <i className="fas fa-book"></i> Courses
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link" style={{ color: 'white' }}>
                      <i className="fas fa-user"></i> Welcome, {user.username}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      <i className="fas fa-user-plus"></i> Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      <i className="fas fa-sign-in-alt"></i> Sign In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
