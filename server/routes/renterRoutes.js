const express = require('express');
const {
    getRenterBookings,
    bookProperty
} = require('../controllers/renterController');
const authenticate = require('../middleware/authMiddleware');
const authRole = require('../middleware/authRoleMiddleware');

const router = express.Router();

// Renter Dashboard: Get bookings of the renter
router.get('/bookings', authenticate, authRole('renter'), getRenterBookings);

// Book a property
router.post('/bookings', authenticate, authRole('renter'), bookProperty);

module.exports = router;