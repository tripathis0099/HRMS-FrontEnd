// src/services/candidateService.js

import axios from "axios";

const API_URL = "http://localhost:5000/api/candidates"; // Replace with your backend URL

// Create Candidate
export const createCandidate = async (candidateData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, candidateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Get Candidates with optional filters for search and sort
export const getCandidates = async (filter = "", sortBy = "") => {
  try {
    const response = await axios.get(`${API_URL}?filter=${filter}&sortBy=${sortBy}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Move Candidate to Employee
export const moveToEmployee = async (candidateId) => {
  try {
    const response = await axios.post(`${API_URL}/moveToEmployee`, { candidateId });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
