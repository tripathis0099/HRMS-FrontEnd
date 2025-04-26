import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/Sidebar.css';
import { logout } from '../../services/authService';
import LogoutPopup from './LogoutPopup';

const Sidebar = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [logOutPopUp, setShowLogoutPopup] = useState('');
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">LOGO</Link>
      </div>
      
      <div className="search-container">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div className="section-header">Recruitment</div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/candidates" className={isActive('/candidates') ? 'active' : ''}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Candidates
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="section-header">Organization</div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/employees" className={isActive('/employees') ? 'active' : ''}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C22.9986 17.1771 21.7079 15.5857 20 15.13M16 3.13C17.7699 3.58137 19.0684 5.17551 19.0684 7.005C19.0684 8.83449 17.7699 10.4286 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Employees
            </Link>
          </li>
          <li>
            <Link to="/attendance" className={isActive('/attendance') ? 'active' : ''}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Attendance
            </Link>
          </li>
          <li>
            <Link to="/leaves" className={isActive('/leaves') ? 'active' : ''}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Leaves
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="spacer"></div>
      
      <div className="section-header">Others</div>
      <div className="others">
        <ul>
          <li>
            <Link onClick={() =>setShowLogoutPopup(true)} >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      {logOutPopUp && (
      <LogoutPopup
        onCancel={() => setShowLogoutPopup(false)}
        onConfirm={logout}
      />
    )}
    </div>
     
  );
};

export default Sidebar;