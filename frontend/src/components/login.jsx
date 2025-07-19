import React, { useState } from "react";
import "./Login.css";

export default function Login({ onAccountCreated }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && !formData.fullName.trim()) {
      setError("An error occurred while creating your account. Please try again.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("An error occurred while creating your account. Please try again.");
      return;
    }
    if (formData.password.length < 6) {
      setError("An error occurred while creating your account. Please try again.");
      return;
    }
    
    if (isSignUp) {
      // Navigate to Educational Background page
      console.log("Account created:", formData);
      if (onAccountCreated) {
        onAccountCreated(formData);
      }
    } else {
      // Handle sign in
      console.log("Sign in:", formData);
    }
  };

  return (
    <div className="learn-style-container">
      {/* Header Section */}
      <div className="header-section">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <h1>LearnStyle</h1>
        </div>
        <p className="tagline">Discover your unique learning style and get personalized recommendations</p>
        
        {/* Feature Icons */}
        <div className="features">
          <div className="feature">
            <div className="feature-icon">👤</div>
            <h3>Personal Profile</h3>
            <p>Tell us about your background</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📚</div>
            <h3>Learning Assessment</h3>
            <p>Take our VARK-based quiz</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Get Recommendations</h3>
            <p>Receive personalized learning paths</p>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="form-section">
        <div className="form-container">
          <h2>{isSignUp ? "Create Your Account" : "Welcome Back"}</h2>
          <p className="form-subtitle">
            {isSignUp ? "Start your personalized learning journey" : "Continue your learning journey"}
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {isSignUp && (
              <div className="input-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <span className="password-toggle">👁️</span>
              </div>
            </div>

            <button type="submit" className="submit-button">
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <div className="form-footer">
            <button
              className="toggle-link"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
                setFormData({ fullName: "", email: "", password: "" });
              }}
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>

            {isSignUp && (
              <p className="terms-text">
                By signing up, you agree to our <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
