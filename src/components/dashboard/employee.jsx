import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css/Employee.css";
import EmployeeHeader from './employeeHeader';

const Employees = ({ employees, setSearchTerm, setSortBy, onEditClick, refreshEmployees }) => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [positionFilter, setPositionFilter] = useState(''); // Changed departmentFilter to positionFilter
  const [statusFilter, setStatusFilter] = useState('');
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  // Function to update the employee status
  const updateStatus = async (employeeId, newStatus) => {
    try {
      const employee = employees.find(emp => emp._id === employeeId);
      if (!employee) return;

      const response = await axios.put(`http://localhost:5000/api/employees/${employeeId}`, {
        ...employee,
        status: newStatus
      });

      alert("Status updated successfully");
      refreshEmployees();
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle search filter
  const handleSearch = (searchTerm) => {
    const filtered = employees.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // Filter the employees based on position and status
  const filterEmployees = () => {
    let filtered = employees;

    if (positionFilter) {
      filtered = filtered.filter(employee => employee.position === positionFilter); // Filter by position
    }

    if (statusFilter) {
      filtered = filtered.filter(employee => employee.status === statusFilter);
    }

    setFilteredEmployees(filtered);
  };

  // Toggle dropdown visibility
  const handleDropdownToggle = (employeeId) => {
    setStatusDropdown(statusDropdown === employeeId ? null : employeeId);
  };

  // Handle delete employee
  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
      alert("Employee deleted successfully");
      refreshEmployees();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    handleSearch("");  // Trigger the search filter with the empty term
  }, [employees]);

  useEffect(() => {
    filterEmployees(); // Reapply filters when position or status changes
  }, [positionFilter, statusFilter, employees]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="employees">
      <h2>Employees</h2>
      <EmployeeHeader 
        setSearchTerm={handleSearch} 
        setPositionFilter={setPositionFilter}  // Pass setPositionFilter to EmployeeHeader
        setStatusFilter={setStatusFilter} 
      />
      <table>
        <thead>
          <tr>
            <th>Profile</th> {/* Changed from Sr no. to Profile */}
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Phone Number</th> {/* Added Phone Number column */}
            <th>Position</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td>
                <img 
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}  // Random avatar
                  alt={`Profile of ${employee.name}`} 
                  className="employee-avatar" 
              />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td> {/* Added phone number */}
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>{formatDate(employee.dateOfJoining)}</td>
              <td>
                <select
                  className={employee.status === 'Active' ? 'status-active' : 'status-inactive'}
                  value={selectedStatus[employee._id] || employee.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setSelectedStatus({ ...selectedStatus, [employee._id]: newStatus });
                    updateStatus(employee._id, newStatus);
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDropdownToggle(employee._id)}>
                  &#x22EE; {/* Ellipsis button */}
                </button>
                {statusDropdown === employee._id && (
                  <div className="action-dropdown">
                    <button onClick={() => onEditClick(employee)}>Edit Employee</button>
                    <button onClick={() => handleDelete(employee._id)}>Delete Employee</button>
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

export default Employees;
