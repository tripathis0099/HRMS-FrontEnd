import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Check for the token in localStorage

  if (!token) {
    return <Navigate to="/" />; // Redirect to login if no token
  }

  return element; // Render the children (protected page) if authenticated
};

export default PrivateRoute;
