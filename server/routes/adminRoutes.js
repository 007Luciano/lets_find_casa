const express = require('express');
const { getAllUsers } = require('../controllers/adminController');
const authenticate = require('../middleware/authMiddleware');
const authRole = require('../middleware/authRoleMiddleware');

const router = express.Router();

// Admin Dashboard: Get all users
router.get('/users', authenticate, authRole('admin'), getAllUsers);

module.exports = router;