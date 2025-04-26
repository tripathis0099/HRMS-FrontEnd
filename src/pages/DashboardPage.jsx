// src/pages/candidatesPage.js

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Candidates from '../components/dashboard/Candidates';
import { getCandidates } from '../services/candidateService';
import './css/Dashboard.css';
import AddCandidatePopup from '../components/dashboard/addCandidatePopUp';

const DashboardPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const fetchCandidates = async () => {
    const data = await getCandidates(searchTerm, sortBy);
    setCandidates(data);
  };

  useEffect(() => {
    fetchCandidates();
  }, [searchTerm, sortBy]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        {/* <Header /> */}
        <Candidates
         setShowPopup={setShowPopup}
          candidates={candidates}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
        />
        {showPopup && (
          <AddCandidatePopup
            closePopup={() => setShowPopup(false)}
            refreshCandidates={fetchCandidates}
          />
        )}
        {/* <button onClick={() => setShowPopup(true)}>Add Candidate</button> */}
      </div>
    </div>
  );
};

export default DashboardPage;
