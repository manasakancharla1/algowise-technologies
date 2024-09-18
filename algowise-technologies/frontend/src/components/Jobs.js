import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import JobCard from './JobCard';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if not authenticated
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs', {
          params: {
            page: page,
            limit: 10,
            search: searchTerm,
          },
        });
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [page, searchTerm, navigate]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs/autocomplete', {
          params: { search: value },
        });
        setAutocompleteResults(response.data);
      } catch (error) {
        console.error('Error fetching autocomplete results:', error);
      }
    } else {
      setAutocompleteResults([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setAutocompleteResults([]); // Hide the dropdown once a suggestion is selected
  };

  return (
    <section id="jobs">
      <h2>Available Jobs</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by job title or location..."
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
                {result.title} - {result.location}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="job-list">
        {jobs.map(job => (
          <JobCard key={job._id} job={job} /> // Use job._id instead of job.id
        ))}
      </div>
      
      <div className="pagination-controls">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &laquo; Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next &raquo;
        </button>
      </div>
    </section>
  );
};

const styles = {
  searchContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
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
    listStyleType: 'none',
    padding: 0,
    margin: '10px 0 0 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    maxHeight: '150px',
    overflowY: 'auto',
  },
  autocompleteItem: {
    padding: '10px',
    cursor: 'pointer',
  },
};

export default Jobs;
