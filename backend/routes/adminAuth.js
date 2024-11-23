// routes/adminAuth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admins');
require('dotenv').config();
const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin registration (temporary for initial setup or secured with adminAuth for subsequent admins)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists with this username' });
      }
  
      // Create and save a new admin
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
  
      res.status(201).json({ message: 'Admin user created successfully', admin: newAdmin.username });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating admin user', error: err.message });
    }
  });

module.exports = router;
