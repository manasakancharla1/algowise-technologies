import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './CourseCard.css'; // Add your custom styles here

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  // Function to handle apply button click
  const handleApplyClick = (event) => {
    event.stopPropagation(); // Prevent parent onClick from triggering
    const user = localStorage.getItem('user'); // Check if user is signed in
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if not signed in
    } else {
      alert(`You have successfully applied for the course: ${course.title}`);
      // Add logic to handle applying for the course (e.g., API call)
    }
  };

  // Function to handle save button click
  const handleSaveClick = (event) => {
    event.stopPropagation(); // Prevent parent onClick from triggering
    const user = localStorage.getItem('user'); // Check if user is signed in
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if not signed in
    } else {
      alert(`You have saved the course: ${course.title}`);
      // Add logic to handle saving the course (e.g., API call)
    }
  };

  return (
    <div className="course-card">
      <h3><span>Course:</span> {course.title}</h3>
      <h6><span>Provider:</span> {course.provider}</h6>
      <p><span>Duration:</span> {course.duration}</p>
      <p><span>Description:</span> {course.description}</p>
      <p><span>Price:</span> &#8377;{course.price}</p>

      {/* Buttons to apply and save */}
      <button className="btn btn-primary" onClick={handleApplyClick}>Apply</button>
      <button className="btn btn-secondary" onClick={handleSaveClick}>Save</button>
    </div>
  );
};

export default CourseCard;
