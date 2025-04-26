import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeaveHeader from './leaveHeader';
import LeaveCalendar from './leaveCalander';

const LeaveList = ({ leaves, setSearchTerm, setSortBy, onEditClick, refreshLeaves,setShowAddPopup }) => {
  const [filteredLeaves, setFilteredLeaves] = useState(leaves);
  const [statusFilter, setStatusFilter] = useState('');
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  // Function to update the leave status
  const updateStatus = async (leaveId, newStatus) => {
    try {
      const leave = leaves.find(lv => lv._id === leaveId);
      if (!leave) return;

      const response = await axios.put(`http://localhost:5000/api/leaves/${leaveId}`, {
        ...leave,
        status: newStatus
      });

      alert("Status updated successfully");
      refreshLeaves();
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle search filter
  const handleSearch = (searchTerm) => {
    const filtered = leaves.filter(leave => 
      leave.employeeId?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeaves(filtered);
  };

  // Filter the leaves based on status
  const filterLeaves = () => {
    let filtered = leaves;

    if (statusFilter) {
      filtered = filtered.filter(leave => leave.status === statusFilter);
    }

    setFilteredLeaves(filtered);
  };

  // Toggle dropdown visibility
  const handleDropdownToggle = (leaveId) => {
    setStatusDropdown(statusDropdown === leaveId ? null : leaveId);
  };

  // Handle delete leave
  const handleDelete = async (leaveId) => {
    try {
      await axios.delete(`http://localhost:5000/api/leaves/${leaveId}`);
      alert("Leave request deleted successfully");
      refreshLeaves();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    handleSearch("");  // Trigger the search filter with the empty term
  }, [leaves]);

  useEffect(() => {
    filterLeaves(); // Reapply filters when status changes
  }, [statusFilter, leaves]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="employees">
      <h2>Leave Management</h2>
      <LeaveHeader 
      setShowAddPopup={setShowAddPopup}
        setSearchTerm={handleSearch} 
        setStatusFilter={setStatusFilter} 
      />
      <div style={{
        display: "flex",
        gap: "8px"
      }}>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Leave Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.employeeId?.name}</td>
              <td>{leave.employeeId?.department}</td>
              <td>{formatDate(leave.leaveDate)}</td>
              <td>{leave.reason}</td>
              <td>
                <select
                  className={`status-${leave.status.toLowerCase()}`}
                  value={selectedStatus[leave._id] || leave.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setSelectedStatus({ ...selectedStatus, [leave._id]: newStatus });
                    updateStatus(leave._id, newStatus);
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDropdownToggle(leave._id)}>
                  &#x22EE; {/* Ellipsis button */}
                </button>
                {statusDropdown === leave._id && (
                  <div className="action-dropdown">
                    <button onClick={() => onEditClick(leave)}>Edit Leave</button>
                    <button onClick={() => handleDelete(leave._id)}>Delete Leave</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LeaveCalendar leaves={leaves}/>
      </div>
    </div>
  );
};

export default LeaveList;