import React from 'react';
import './Home.css'; // Add custom styles for the home page if needed
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section id="home" className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to AlgoWise Technologies</h1>
          <p>Your gateway to the latest technology jobs and courses.</p>
          <div className="hero-buttons">
            <Link to="/jobs" className="btn btn-primary">Explore Jobs</Link>
            <Link to="/courses" className="btn btn-secondary">Browse Courses</Link>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <i className="fas fa-briefcase"></i>
          <h3>Find Your Dream Job</h3>
          <p>Browse and apply for opportunities in various fields.</p>
        </div>
        <div className="feature">
          <i className="fas fa-book"></i>
          <h3>Learn New Skills</h3>
          <p>Enhance your knowledge with our extensive course offerings.</p>
        </div>
        <div className="feature">
          <i className="fas fa-graduation-cap"></i>
          <h3>Achieve Your Goals</h3>
          <p>Get certified and achieve your career goals with our guidance.</p>
        </div>
      </div>
      <div className="cta">
        <h2>Ready to take the next step?</h2>
        <p>Sign up now to get started on your journey to success.</p>
        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
      </div>
    </section>
  );
}

export default Home;
