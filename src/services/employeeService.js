import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

// Get all employees with optional search and sort parameters
export const getEmployees = async (searchTerm = '', sortBy = 'name') => {
  try {
    const query = `?search=${searchTerm}&sort=${sortBy}`;
    const response = await axios.get(`${API_URL}${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Update an employee
export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};