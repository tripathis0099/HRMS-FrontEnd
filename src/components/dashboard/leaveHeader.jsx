import React, { useState } from 'react';

const LeaveHeader = ({ setSearchTerm, setStatusFilter,setShowAddPopup }) => {
  const [searchTerm, setSearch] = useState('');
  const [statusFilter, setStatus] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setStatusFilter(e.target.value);
  };

  return (
    <div className="header-comp">
      <div className="header-left" style={{ width: "100%" }}>
        <div className="search-bar"
            style={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: 'space-between',
                backgroundColor: "white",
                width: "100%"
            }}
        >
          <input
            type="text"
            style={{ borderRadius: '20px' }}
            placeholder="Search Employee Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select onChange={handleStatusChange} className="filter-dropdown">
            <option value="">Filter by Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button className='add-candidate-btn' onClick={()=>setShowAddPopup(true)}>
            Add Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveHeader;