import React, { useState } from 'react';

export const AttendanceHeader = ({ setSearchTerm, statusFilter, setStatusFilter }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="attendance-header">
      <div className="filter-container">
        <div className="status-filter">
          <select 
            value={statusFilter} 
            onChange={handleStatusFilterChange}
            className="status-dropdown"
          >
            <option value="">Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      </div>
      <div className="search-container">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
    </div>
  );
};