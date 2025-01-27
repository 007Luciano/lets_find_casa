const express = require('express');
const { registerUser, loginUser, resetPassword } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const authRole = require('../middleware/authRoleMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);

// Role-based routes
router.get('/admin/users', authenticate, authRole('admin'), (req, res) => {
    res.send('Admin-only route: Viewing all users.');
});

router.post('/owner/properties', authenticate, authRole('owner'), (req, res) => {
    res.send('Owner-only route: Adding a property.');
});

router.get('/renter/properties', authenticate, authRole('renter'), (req, res) => {
    res.send('Renter-only route: Viewing properties.');
});

module.exports = router;
