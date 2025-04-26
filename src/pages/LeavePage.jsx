// src/pages/LeavePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/dashboard/Sidebar';
import './css/Dashboard.css';
import LeaveList from '../components/dashboard/leaveList';
import EditLeavePopup, { AddLeavePopup } from '../components/dashboard/editLeavePopup';
import Header from '../components/dashboard/Header';
import "./css/leave.css"

const LeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('employeeId');

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leaves');
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [searchTerm, sortBy]);

  const handleEditClick = (leave) => {
    setCurrentLeave(leave);
    setShowEditPopup(true);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <LeaveList
        setShowAddPopup={setShowAddPopup}
          leaves={leaves}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
          onEditClick={handleEditClick}
          refreshLeaves={fetchLeaves}
        />
        {showAddPopup && (
          <AddLeavePopup
            closePopup={() => setShowAddPopup(false)}
            refreshLeaves={fetchLeaves}
          />
        )}
        {showEditPopup && currentLeave && (
          <EditLeavePopup
            leave={currentLeave}
            closePopup={() => setShowEditPopup(false)}
            refreshLeaves={fetchLeaves}
          />
        )}
      </div>
    </div>
  );
};

export default LeavePage;