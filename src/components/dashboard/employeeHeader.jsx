import React, { useState } from 'react';
import './css/Header.css';

const EmployeeHeader = ({ setSearchTerm, setPositionFilter, setStatusFilter }) => {  // Changed setDepartmentFilter to setPositionFilter
  const [searchTerm, setSearch] = useState('');
  const [positionFilter, setPosition] = useState(''); // Changed departmentFilter to positionFilter
  const [statusFilter, setStatus] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handlePositionChange = (e) => {  // Changed handleDepartmentChange to handlePositionChange
    setPosition(e.target.value);
    setPositionFilter(e.target.value); // Updated to setPositionFilter
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusFilter(e.target.value);
  };

  return (
    <div className="header-comp">
      <div className="header-left"
style={{
    width:"100%"
}}
>
        <div className="search-bar"
            style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent:'space-between',
                backgroundColor: "white",
                width:"100%"
            }}
>
          <input
            type="text"
            style={{
                borderRadius:'20px'
            }}
            placeholder="Search Employees"
            value={searchTerm}
            onChange={handleSearchChange}
          />
 <select onChange={handlePositionChange} className="filter-dropdown">
          <option value="">Filter by Position</option> {/* Changed filter label from "Department" to "Position" */}
          <option value="Intern">Intern</option>
          <option value="Full Time">Full Time</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Team Lead">Team Lead</option>
        </select>
        </div>
       
      </div>
    </div>
  );
};

export default EmployeeHeader;
