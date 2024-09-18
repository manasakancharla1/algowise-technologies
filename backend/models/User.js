const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, // Ensure unique username
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

// Create the User model
const User = mongoose.model('User', userSchema, 'users'); // 'users' is the name of the collection

module.exports = User;
