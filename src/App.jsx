import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CandidateListPage from './pages/CandidateListPage';
import EmployeeListPage from './pages/EmployeeListPage';
import PrivateRoute from './components/PrivateRoute'; // Make sure PrivateRoute is working properly
import './styles/App.css';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeeListPage';
import AttendancePage from './pages/AttendancePage';
import LeavePage from './pages/LeavePage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public route for Login */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Protected routes (wrapped inside PrivateRoute) */}
          <Route
            path="/candidates"
            element={
              <PrivateRoute element={<DashboardPage />} />
            }
          />
          <Route
            path="/employees"
            element={
              <PrivateRoute element={<EmployeesPage />} />
            }
          />
          <Route
            path="/attendance"
            element={
              <PrivateRoute element={<AttendancePage />} />
            }
          />
          <Route
            path="/leaves"
            element={
              <PrivateRoute element={<LeavePage />} />
            }
          />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
