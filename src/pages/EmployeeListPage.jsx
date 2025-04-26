// src/pages/employeesPage.js

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Employees from '../components/dashboard/employee';
import { getEmployees } from '../services/employeeService';
import './css/Dashboard.css';
import EditEmployeePopup from '../components/dashboard/editEmployeePopup';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const fetchEmployees = async () => {
    const data = await getEmployees(searchTerm, sortBy);
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [searchTerm, sortBy]);

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setShowEditPopup(true);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Employees
          employees={employees}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
          onEditClick={handleEditClick}
          refreshEmployees={fetchEmployees}
        />
        {showEditPopup && currentEmployee && (
          <EditEmployeePopup
            employee={currentEmployee}
            closePopup={() => setShowEditPopup(false)}
            refreshEmployees={fetchEmployees}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;