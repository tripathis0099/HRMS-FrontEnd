import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './css/loginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password);
      navigate('/candidates');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await authService.register(name, email, password);
      alert('Registration successful! Please login.');
      setIsRegistering(false); // Switch to login form after successful registration
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="logo">
          <div style={{
            height: "30px",
            width: "30px",
            marginRight: "8px",
            border: "2px solid black"
          }}></div>
          LOGO
        </div>
      </header>

      <div className="login-section">
        <div className="left-side">
          <div className="image-container">
            <img src="/hrms_images/login.png" alt="Dashboard Preview" />
          </div>
          <div className="info-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            </p>
            <p>
              Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>

        <div className="right-side">
          {isRegistering ? (
            <h2>Create an Account</h2>
          ) : (
            <h2>Welcome to Dashboard</h2>
          )}
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="login-form">
            {isRegistering && (
              <>
                <label htmlFor="name">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                />
              </>
            )}
            <label htmlFor="email">Email Address*</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {isRegistering && (
              <>
                <label htmlFor="confirmPassword">Confirm Password*</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </>
            )}
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
            <button type="submit" className="login-btn">
              {isRegistering ? 'Register' : 'Login'}
            </button>
            <p className="register-link">
              {isRegistering ? 'Already have an account? ' : "Don’t have an account? "}
              <a href="#" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Login' : 'Register'}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
