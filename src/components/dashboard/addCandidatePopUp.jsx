import React, { useState } from 'react';
import { createCandidate } from '../../services/candidateService';
import "./css/popup.css"

const AddCandidatePopup = ({ closePopup, refreshCandidates }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experiance, setexperiance] = useState('');
  const [position, setPosition] = useState('');
  const [resume, setResume] = useState(null);  // Store file object, not just name
  const [checked, setChecked] = useState(false);

  const handleSubmit = async () => {
    if (!checked) {
      alert('Please accept the terms before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('experiance', experiance);
    formData.append('position', position);
    if (resume) {
      formData.append('resume', resume);  // Append the resume file to the formData
    }

    try {
      await createCandidate(formData);  // Send FormData
      refreshCandidates(); // Call to refresh the candidate list
      closePopup(); // Close the popup after submission
    } catch (error) {
      alert(error.message);
    }
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0] || null); // Store the file object
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add New Candidate</h2>
        <div className="input-group">
          <label>Full Name*</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email Address*</label>
          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Phone Number*</label>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Position*</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          >
            <option value="Intern">Intern</option>
            <option value="Full Time">Full Time</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Team Lead">Team Lead</option>
          </select>
        </div>
        <div className="input-group">
          <label>experiance*</label>
          <input
            type="number"
            placeholder="Enter experiance"
            value={experiance}
            onChange={(e) => setexperiance(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Resume*</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
          {resume && <span style={{
            color:"black"
          }}>{resume.name}</span>} {/* Display the file name */}
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="conf"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <label htmlFor="conf">I hereby declare that the above information is true to the best of my knowledge and belief</label>
        </div>
        <div className="popup-actions">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddCandidatePopup;
