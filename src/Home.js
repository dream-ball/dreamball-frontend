import React from "react";
import "./utils/styles/Home.css";
import logo from './white-logo.png'

const LandingPage = () => {



  const handlePlaybtn = ()=>{

  }

  const handleGetBetabtn = ()=>{
    
  }

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="DreamBall Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-to-play">How to Play</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button className="play-btn" onClick={handlePlaybtn}>Play Now</button></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="home_hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>DreamBall Cricket Fantasy</h1>
          <p>Turn Your Fantasy Into Reality</p>
          <button className="play-btn" onClick={handleGetBetabtn}>Get Beta</button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Why Choose DreamBall?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Real-Time Matches</h3>
            <p>Track live scores and compete with others.</p>
          </div>
          <div className="feature-card">
            <h3>Win Big Rewards</h3>
            <p>Cash prizes and exciting offers for top players.</p>
          </div>
          <div className="feature-card">
            <h3>Create Your Team</h3>
            <p>Select real players and earn points based on performance.</p>
          </div>
        </div>
      </section>

      {/* Steps to Play */}
      <section id="how-to-play" className="steps">
        <h2>How to Play?</h2>
        <div className="step-list">
          <div className="step"><span>1</span><p>Sign up & create an account.</p></div>
          <div className="step"><span>2</span><p>Choose a match & build your fantasy team.</p></div>
          <div className="step"><span>3</span><p>Earn points based on player performance.</p></div>
          <div className="step"><span>4</span><p>Win prizes & withdraw earnings easily.</p></div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <p>&copy; 2025 DreamBall. All rights reserved.</p>
          <ul className="footer-links">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Support</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
