// src/services/leaveService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaves';

export const getAllLeaves = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching leaves:', error);
    throw error;
  }
};

export const getLeaveById = async (leaveId) => {
  try {
    const response = await axios.get(`${API_URL}/${leaveId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leave:', error);
    throw error;
  }
};

export const createLeave = async (leaveData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, leaveData);
    return response.data;
  } catch (error) {
    console.error('Error creating leave:', error);
    throw error;
  }
};

export const updateLeave = async (leaveId, leaveData) => {
  try {
    const response = await axios.put(`${API_URL}/${leaveId}`, leaveData);
    return response.data;
  } catch (error) {
    console.error('Error updating leave:', error);
    throw error;
  }
};

export const deleteLeave = async (leaveId) => {
  try {
    const response = await axios.delete(`${API_URL}/${leaveId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting leave:', error);
    throw error;
  }
};