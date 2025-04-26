import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/Attendance.css";
import { AttendanceHeader } from './attendanceHeader';
import EditTaskPopup from './EditTaskPopup';

const EmployeeAttendance = ({ 
  employees, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  refreshEmployees 
}) => {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [actionDropdown, setActionDropdown] = useState(null);

  // Handle search filter
  const handleSearch = (searchTerm) => {
    const filtered = employees.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // Filter employees by attendance status
  const filterEmployeesByStatus = () => {
    if (!statusFilter) {
      setFilteredEmployees(employees);
      return;
    }
    
    const filtered = employees.filter(employee => 
      employee.attendance === statusFilter
    );
    setFilteredEmployees(filtered);
  };

  // Update attendance status
  const updateAttendance = async (employeeId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/employees/attendance/${employeeId}`, {
        attendance: newStatus
      });
      refreshEmployees();
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Failed to update attendance status');
    }
  };

  // Toggle action dropdown
  const toggleActionDropdown = (employeeId) => {
    setActionDropdown(actionDropdown === employeeId ? null : employeeId);
  };

  // Handle edit task click
  const handleEditTask = (employee) => {
    setCurrentEmployee(employee);
    setShowTaskPopup(true);
    setActionDropdown(null);
  };

  useEffect(() => {
    handleSearch("");
  }, [employees]);

  useEffect(() => {
    filterEmployeesByStatus();
  }, [statusFilter, employees]);

  return (
    <div className="attendance-container">
      <h2>Attendance</h2>
      <AttendanceHeader 
        setSearchTerm={handleSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td className="profile-cell">
                  <div className="profile-avatar">
                    {employee.name.charAt(0)}
                  </div>
                </td>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td className="task-cell">
                  {employee.task || '--'}
                </td>
                <td>
                  <div className={`attendance-status ${employee.attendance.toLowerCase()}`}>
                    <select
                      value={employee.attendance}
                      onChange={(e) => updateAttendance(employee._id, e.target.value)}
                      className={employee.attendance === 'Present' ? 'status-present' : 'status-absent'}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Causal Leave">Causal Leave</option>
                      <option value="Medical Leave">Medical Leave</option>
                    </select>
                  </div>
                </td>
                <td className="action-cell">
                  <button className="action-btn" onClick={() => toggleActionDropdown(employee._id)}>
                    &#8942; {/* Vertical ellipsis */}
                  </button>
                  {actionDropdown === employee._id && (
                    <div className="action-dropdown">
                      <button onClick={() => handleEditTask(employee)}>Edit Task</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showTaskPopup && currentEmployee && (
        <EditTaskPopup
          employee={currentEmployee}
          closePopup={() => setShowTaskPopup(false)}
          refreshEmployees={refreshEmployees}
        />
      )}
    </div>
  );
};

export default EmployeeAttendance;