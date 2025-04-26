import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { getEmployees } from '../services/employeeService';
import './css/Dashboard.css';
import EmployeeAttendance from '../components/dashboard/EmployeeAttendance';

const AttendancePage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchEmployees = async () => {
    const data = await getEmployees();
    
    // Add attendance and task properties if they don't exist
    const enhancedData = data.map(employee => ({
      ...employee,
      attendance: employee.attendance || 'Present',
      task: employee.task || '--'
    }));
    
    setEmployees(enhancedData);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <EmployeeAttendance
          employees={employees}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          refreshEmployees={fetchEmployees}
        />
      </div>
    </div>
  );
};

export default AttendancePage;