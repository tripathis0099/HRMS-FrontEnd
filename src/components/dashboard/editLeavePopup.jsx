// src/components/dashboard/leave/EditLeavePopup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditLeavePopup = ({ leave, closePopup, refreshLeaves }) => {
  const [reason, setReason] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [status, setStatus] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  
  useEffect(() => {
    // Format date for input field (YYYY-MM-DD)
    const formattedDate = leave.leaveDate ? new Date(leave.leaveDate).toISOString().split('T')[0] : '';
    
    setReason(leave.reason || '');
    setLeaveDate(formattedDate);
    setStatus(leave.status || 'Pending');
    setEmployeeName(leave.employeeId?.name || 'Employee');
  }, [leave]);

  const handleSubmit = async () => {
    const updatedLeave = {
      reason,
      leaveDate,
      status
    };

    try {
      await axios.put(`http://localhost:5000/api/leaves/${leave._id}`, updatedLeave);
      refreshLeaves(); // Call to refresh the leave list
      closePopup(); // Close the popup after submission
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit Leave Request</h2>
        <div className="input-group">
          <label>Employee</label>
          <input
            type="text"
            value={employeeName}
            disabled
          />
        </div>
        <div className="input-group">
          <label>Leave Date*</label>
          <input
            type="date"
            value={leaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Reason*</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for leave"
            required
          />
        </div>
        <div className="input-group">
          <label>Status*</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="popup-actions">
          <button onClick={handleSubmit}>Save Changes</button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditLeavePopup;

export const AddLeavePopup = ({ closePopup, refreshLeaves }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [leaveDate, setLeaveDate] = useState('');
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('Pending');
    const [employees, setEmployees] = useState([]);
    
    useEffect(() => {
      // Fetch employee list for dropdown
      const fetchEmployees = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/employees');
          setEmployees(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };
      
      fetchEmployees();
    }, []);
  
    const handleSubmit = async () => {
      if (!employeeId || !leaveDate || !reason) {
        alert('Please fill all the required fields');
        return;
      }
  
      const leaveData = {
        employeeId,
        leaveDate,
        reason,
        status
      };
  
      try {
        await axios.post('http://localhost:5000/api/leaves/create', leaveData);
        alert('Leave request created successfully');
        refreshLeaves();
        closePopup();
      } catch (error) {
        alert(error.response?.data?.message || 'Error creating leave request');
      }
    };
  
    return (
      <div className="popup">
        <div className="popup-content">
          <h2>Add Leave Request</h2>
          <div className="input-group">
            <label>Employee*</label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              <option value="">Select Employee</option>
              {employees.map(employee => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
            <label>Leave Date*</label>
            <input
              type="date"
              value={leaveDate}
              onChange={(e) => setLeaveDate(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Reason*</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              required
            />
          </div>
          <div className="input-group">
            <label>Status*</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="popup-actions">
            <button onClick={handleSubmit}>Add Leave</button>
            <button onClick={closePopup}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  