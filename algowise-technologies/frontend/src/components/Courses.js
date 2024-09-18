import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import CourseCard from './CourseCard';
import './Courses.css'; // Make sure this file is correctly linked

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if not authenticated
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses', {
          params: {
            page: page,
            limit: 10, // Number of items per page
            search: searchTerm,
          },
        });
        setCourses(response.data.courses);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [page, searchTerm, navigate]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value !== '') {
      try {
        const response = await axios.get('http://localhost:5000/api/courses/autocomplete', {
          params: { search: value },
        });
        setAutocompleteResults(response.data); // Update the autocomplete results
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      setAutocompleteResults([]); // Clear autocomplete if search input is empty
    }
  };

  const handleSelectSuggestion = (title) => {
    setSearchTerm(title); // Update search term with selected suggestion
    setAutocompleteResults([]); // Clear the suggestions
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <section id="courses">
      <h2>Available Courses</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by course title or provider..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <i className="fas fa-search" style={styles.searchIcon}></i>
        {autocompleteResults.length > 0 && (
          <ul style={styles.autocompleteDropdown}>
            {autocompleteResults.map((result, index) => (
              <li
                key={index}
                onClick={() => handleSelectSuggestion(result.title)}
                style={styles.autocompleteItem}
              >
                {result.title} - {result.provider}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="course-list">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          &laquo; Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next &raquo;
        </button>
      </div>
    </section>
  );
};

const styles = {
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
  },
  searchInput: {
    width: '100%',
    padding: '10px 40px 10px 20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  searchIcon: {
    position: 'absolute',
    right: '10px',
    fontSize: '20px',
    color: '#333',
  },
  autocompleteDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    zIndex: 1000,
    listStyle: 'none',
    padding: '8px 0',
    margin: 0,
  },
  autocompleteItem: {
    padding: '10px',
    cursor: 'pointer',
  },
};

export default Courses;
