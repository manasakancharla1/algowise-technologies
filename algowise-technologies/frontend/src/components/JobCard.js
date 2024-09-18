import React, { useState } from 'react';
import './JobCard.css';

const JobCard = ({ job, onClick, isSelected }) => {
  const [isCardSelected, setIsCardSelected] = useState(isSelected);

  // Toggle card selection
  const handleCardClick = () => {
    setIsCardSelected(!isCardSelected);
    if (onClick) onClick(job); // Call parent onClick handler if provided
  };

  // Function to handle apply button click
  const handleApplyClick = (event) => {
    event.stopPropagation(); // Prevent parent onClick from triggering
    alert(`You have applied for the job: ${job.title}`);
  };

  // Function to handle save button click
  const handleSaveClick = (event) => {
    event.stopPropagation(); // Prevent parent onClick from triggering
    alert(`You have saved the job: ${job.title}`);
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
