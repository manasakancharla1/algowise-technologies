import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './CourseCard.css'; // Add custom styles for course card

const CourseCard = ({ course, onClick, isSelected }) => {
  const [isCardSelected, setIsCardSelected] = useState(isSelected);
  const navigate = useNavigate();

  // Toggle card selection
  const handleCardClick = () => {
    setIsCardSelected(!isCardSelected);
    if (onClick) onClick(course); // Call parent onClick handler if provided
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
      alert(`You have successfully applied for the course: ${course.title}`);
      // Add API call logic to apply for the course
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
      alert(`You have saved the course: ${course.title}`);
      // Add API call logic to save the course
    }
  };

  return (
    <div 
      className={`course-card ${isCardSelected ? 'selected' : ''}`} 
      onClick={handleCardClick}
    >
      <h3><span>Course Title :</span> {course.title}</h3>
      <h6><span>Instructor :</span> {course.instructor}</h6>
      <p><span>Duration :</span> {course.duration}</p>
      {isCardSelected && (
        <div className="course-details">
          {/* Display additional course details here */}
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Price:</strong> &#8377;{course.price}</p>
        </div>
      )}
      <button className="btn btn-primary" onClick={handleApplyClick}>Apply</button>
      <button className="btn btn-secondary" onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default CourseCard;
