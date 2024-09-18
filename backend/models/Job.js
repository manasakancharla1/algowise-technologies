// models/Job.js

const mongoose = require('mongoose');

// Define the Job schema
// Define Job schema and model
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },   // Add description field
  duration: { type: String },      // Add duration field
  salary: { type: Number }         // Add salary field (or any other relevant field)
});

// Create Job model
const Job = mongoose.model('Job', jobSchema, 'jobs');

module.exports = Job;
