import React, { useState } from 'react';
import './css/Header.css'; // Add your CSS for styling

const Header = ({ setSearchTerm, setPositionFilter, setStatusFilter, setShowPopup }) => {
  const [searchTerm, setSearch] = useState('');
  const [positionFilter, setPosition] = useState('');
  const [statusFilter, setStatus] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchTerm);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    setPositionFilter(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusFilter(e.target.value);
  };

  return (
    <div className="header-comp">
      <div className="header-left">
        {/* <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div> */}
        
        <select onChange={handleStatusChange} className="filter-dropdown">
          <option value="">Status</option>
          <option value="Selected">Selected</option>
          <option value="Not Selected">Not Selected</option>
          <option value="Pending">Pending</option>
        </select>
      
      <select onChange={handlePositionChange} className="filter-dropdown">
          <option value="">Position</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Intern">Intern</option>
          <option value="Full Time">Full Time</option>
          </select>

          </div>
      {/* <div className="search-bar"> */}
          
        {/* </div> */}
      <div className="header-right">
      <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              borderRadius: "20px",
              padding: "4px 14px",
              border: "1px solid gray"
            }}
          />
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowPopup(true)} className="add-candidate-btn">Add Candidate</div>
      </div>
    </div>
  );
};

export default Header;
