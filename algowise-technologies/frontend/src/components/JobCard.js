import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './JobCard.css';

const JobCard = ({ job, onClick, isSelected }) => {
  const [isCardSelected, setIsCardSelected] = useState(isSelected);
  const navigate = useNavigate();

  // Toggle card selection
  const handleCardClick = () => {
    setIsCardSelected(!isCardSelected);
    if (onClick) onClick(job); // Call parent onClick handler if provided
  };

  // Function to handle apply button click
  const handleApplyClick = (event) => {
    event.stopPropagation(); // Prevent parent onClick from triggering
    const user = localStorage.getItem('user'); // Check if user is signed in
    if (!user) {
      // If not signed in, navigate to the sign-in page
      navigate('/signin');
    } else {
      // If signed in, show success alert
      alert(`You have successfully applied for the job: ${job.title}`);
      // Here you can add the API call logic to apply for the job
    }
  };

  // Function to handle save button click
  const handleSaveClick = (event) => {
    event.stopPropagation(); // Prevent parent onClick from triggering
    const user = localStorage.getItem('user'); // Check if user is signed in
    if (!user) {
      // If not signed in, navigate to the sign-in page
      navigate('/signin');
    } else {
      // If signed in, show success alert
      alert(`You have saved the job: ${job.title}`);
      // Here you can add the API call logic to save the job
    }
  };

  return (
    <div 
      className={`job-card ${isCardSelected ? 'selected' : ''}`} 
      onClick={handleCardClick}
    >
      <h3><span>Role :</span> {job.title}</h3>
      <h6><span>Company :</span> {job.company}</h6>
      <p><span>Location :</span> {job.location}</p>
      {isCardSelected && (
        <div className="job-details">
          {/* Display additional job details here */}
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Requirements:</strong> {job.requirements}</p>
          <p><strong>Salary:</strong> &#8377;{job.salary}</p>
        </div>
      )}
      <button className="btn btn-primary" onClick={handleApplyClick}>Apply</button>
      <button className="btn btn-secondary" onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default JobCard;
