import React, { useState } from 'react';
import './CourseCard.css';

const CourseCard = ({ course, onClick, isSelected }) => {
  const [isCardSelected, setIsCardSelected] = useState(isSelected);

  // Toggle card selection
  const handleCardClick = () => {
    setIsCardSelected(!isCardSelected);
    if (onClick) onClick(course); // Call parent onClick handler if provided
  };

  // Function to handle enroll button click
  const handleEnrollClick = (event) => {
    event.stopPropagation(); // Prevent parent onClick from triggering
    alert(`You have enrolled in the course: ${course.title}`);
  };

  // Function to handle save button click
  const handleSaveClick = (event) => {
    event.stopPropagation(); // Prevent parent onClick from triggering
    alert(`You have saved the course: ${course.title}`);
  };

  return (
    <div 
      className={`course-card ${isCardSelected ? 'selected' : ''}`} 
      onClick={handleCardClick}
    >
      <h3><span>Course :</span> {course.title}</h3>
      <p><span>Provider :</span> {course.provider}</p>
      {isCardSelected && (
        <div className="course-details">
          {/* Display additional course details here */}
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Duration:</strong> {course.duration}</p>
          <p><strong>Price:</strong> &#8377; {course.price}</p>
          {/* Add more details as needed */}
        </div>
      )}
      <button className="btn btn-primary" onClick={handleEnrollClick}>Enroll</button>
      <button className="btn btn-secondary" onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default CourseCard;
