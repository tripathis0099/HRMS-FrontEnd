import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import "./css/Candidates.css";

const Candidates = ({ candidates, setSearchTerm, setSortBy, setShowPopup, onDelete }) => {
  const [selectedStatus, setSelectedStatus] = useState({});
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [positionFilter, setPositionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Function to update the candidate status
  const updateStatus = async (candidateId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/candidates/updateStatus/${candidateId}`, { status: newStatus });
      alert(response.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle search filter
  const handleSearch = (searchTerm) => {
    const filtered = candidates.filter(candidate => 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCandidates(filtered);
  };

  // Filter the candidates based on position and status
  const filterCandidates = () => {
    let filtered = candidates;

    if (positionFilter) {
      filtered = filtered.filter(candidate => candidate.position === positionFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(candidate => candidate.status === statusFilter);
    }

    setFilteredCandidates(filtered);
  };

  // Toggle dropdown visibility
  const handleDropdownToggle = (candidateId) => {
    setStatusDropdown(statusDropdown === candidateId ? null : candidateId);
  };

  // Handle delete candidate
  const handleDelete = async (candidateId) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidates/delete/${candidateId}`);
      alert("Candidate deleted successfully");
      // Remove from the filteredCandidates list
      setFilteredCandidates(filteredCandidates.filter(candidate => candidate._id !== candidateId));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    handleSearch("");  // Trigger the search filter with the empty term
  }, [candidates]);

  useEffect(() => {
    filterCandidates(); // Reapply filters when position or status changes
  }, [positionFilter, statusFilter]);

  return (
    <div className="candidates">
      <h2>Candidates</h2>
      <Header 
        setSearchTerm={handleSearch} 
        setPositionFilter={setPositionFilter} 
        setStatusFilter={setStatusFilter} 
        setShowPopup={setShowPopup} 
      />
      <table>
        <thead>
          <tr>
            <th>Sr no.</th>
            <th>Candidates Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Status</th>
            <th>experiance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={candidate._id}>
              <td>{index + 1}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.position}</td>
              <td>
                <select
                  value={selectedStatus[candidate._id] || candidate.status}
                  onChange={(e) => {
                    setSelectedStatus({ ...selectedStatus, [candidate._id]: e.target.value });
                    updateStatus(candidate._id, e.target.value);
                  }}
                >
                  <option value="Selected">Selected</option>
                  <option value="Not Selected">Not Selected</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td>{candidate.experiance}+</td>
              <td>
                <button onClick={() => handleDropdownToggle(candidate._id)}>
                  &#x22EE; {/* Ellipsis button */}
                </button>
                {statusDropdown === candidate._id && (
                  <div className="status-dropdown">
                    {/* Download resume button */}
                    <a href={"http://localhost:5000/download/"+candidate.resume} download target="_blank" rel="noopener noreferrer">
                      <button>Download Resume</button>
                    </a>
                    <button onClick={() => handleDelete(candidate._id)}>Delete Candidate</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;
