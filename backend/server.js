// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());            // Enable CORS for cross-origin requests
app.use(express.json());    // Parse JSON request bodies
app.use(helmet());          // Add security headers to responses

// Rate Limiter to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/jobCoursesDB';  // Use a single MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
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
  
// Define Course schema and model
const courseSchema = new mongoose.Schema({
  title: String,
  provider: String,
  description: String,  // Add description field
  duration: String,     // Add duration field
  price: Number          // Add price field
});
const Course = mongoose.model('Course', courseSchema, 'courses');


// Define User schema and model
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  location: { type: String }
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', userSchema, 'users');

// API endpoint to fetch jobs with pagination from MongoDB
app.get('/api/jobs', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  try {
    const filteredJobs = await Job.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ]
    })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalJobs = await Job.countDocuments({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ]
    });

    res.json({
      jobs: filteredJobs,
      totalPages: Math.ceil(totalJobs / limitNumber),
      currentPage: pageNumber,
      totalJobs
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching jobs from MongoDB' });
  }
});

// API endpoint to fetch courses with pagination from MongoDB
app.get('/api/courses', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  try {
    const filteredCourses = await Course.find({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } }
      ]
    })
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber);

    const totalCourses = await Course.countDocuments({
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { provider: { $regex: search, $options: 'i' } }
      ]
    });

    res.json({
      courses: filteredCourses,
      totalPages: Math.ceil(totalCourses / limitNumber),
      currentPage: pageNumber,
      totalCourses
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses from MongoDB' });
  }
});


// API endpoint for user signup with input validation
app.post('/api/signup', [
  check('fullName').notEmpty().withMessage('Full name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('username').notEmpty().withMessage('Username is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, username, password, phoneNumber, location } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const newUser = new User({
      fullName,
      email,
      username,
      password,
      phoneNumber,
      location
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Error signing up user' });
  }
});

// API endpoint for user sign-in
app.post('/api/signin', [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Sign in successful', username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Error signing in' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
