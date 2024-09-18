// models/Course.js

const mongoose = require('mongoose');

// Define the Course schema
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  duration: { type: String },  // Duration in hours, weeks, etc.
  dateAdded: { type: Date, default: Date.now },
});

// Create the Course model
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
