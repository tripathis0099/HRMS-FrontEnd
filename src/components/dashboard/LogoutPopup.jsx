import React from 'react';
import './css/LogoutPopup.css';

const LogoutPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className="logout-popup-overlay">
      <div className="logout-popup">
        <div className="logout-header">Log Out</div>
        <div className="logout-message">Are you sure you want to log out?</div>
        <div className="logout-actions">
          <button className="add-candidate-btn" onClick={onCancel}>Cancel</button>
          <button className="logout-btn" onClick={onConfirm}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
