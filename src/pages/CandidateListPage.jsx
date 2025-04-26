import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="header-comp">
      <div className="header-left">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Candidates"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearchSubmit}>Search</button>
        </div>
      </div>
      <div className="header-right">
        <Link to="/add-candidate" className="add-candidate-btn">Add Candidate</Link>
      </div>
    </div>
  );
};

export default Header;
