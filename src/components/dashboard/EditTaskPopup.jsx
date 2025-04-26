import React, { useState, useEffect } from 'react';
import axios from 'axios';
const EditTaskPopup = ({ employee, closePopup, refreshEmployees }) => {
  const [task, setTask] = useState(employee.task || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/task/${employee._id}`, {
        task
      });
      refreshEmployees();
      closePopup();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  return (
    <div className="edit-task-popup">
      <div className="popup-content">
        <div className="popup-header">
          <h3>Edit Task for {employee.name}</h3>
          <button className="close-btn" onClick={closePopup}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task">Task Details:</label>
            <textarea
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task details"
              rows={4}
            />
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={closePopup}>Cancel</button>
            <button type="submit" className="save-btn">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskPopup;