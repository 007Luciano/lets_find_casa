const express = require('express');
const {
    getOwnerProperties,
    addProperty,
    getPropertyById,
    updateProperty,
    deleteProperty,
} = require('../controllers/ownerController');
const authenticate = require('../middleware/authMiddleware');
const authRole = require('../middleware/authRoleMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Owner Dashboard: Get properties owned by the owner
router.get('/properties', authenticate, authRole('owner'), getOwnerProperties);

// Add a new property
router.post('/properties', authenticate, authRole('owner'), upload.array('media', 5), addProperty);

// Get a single property by ID
router.get('/properties/:id', authenticate, authRole('owner'), getPropertyById);

// Update a property
router.put('/properties/:id', authenticate, authRole('owner'), upload.array('media', 5), updateProperty);

// Delete a property
router.delete('/properties/:id', authenticate, authRole('owner'), deleteProperty);

module.exports = router;