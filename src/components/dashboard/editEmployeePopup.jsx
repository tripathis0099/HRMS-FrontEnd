import React, { useState, useEffect } from 'react';
import { updateEmployee } from '../../services/employeeService';
import "./css/popup.css";

const EditEmployeePopup = ({ employee, closePopup, refreshEmployees }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Format date for input field (YYYY-MM-DD)
    const formattedDate = employee.dateOfJoining ? new Date(employee.dateOfJoining).toISOString().split('T')[0] : '';
    
    setName(employee.name || '');
    setEmail(employee.email || '');
    setRole(employee.role || '');
    setDepartment(employee.department || '');
    setDateOfJoining(formattedDate);
    setStatus(employee.status || 'Active');
  }, [employee]);

  const handleSubmit = async () => {
    const updatedEmployee = {
      name,
      email,
      role,
      department,
      dateOfJoining,
      status
    };

    try {
      await updateEmployee(employee._id, updatedEmployee);
      refreshEmployees(); // Call to refresh the employee list
      closePopup(); // Close the popup after submission
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Edit Employee</h2>
        <div className="input-group">
          <label>Full Name*</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email Address*</label>
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Role*</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Intern">Intern</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
          </select>
        </div>
        <div className="input-group">
          <label>Department*</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
        <div className="input-group">
          <label>Date of Joining*</label>
          <input
            type="date"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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

export default EditEmployeePopup;