const express = require('express');
const { 
    createProperty, 
    getProperties, 
    getPropertyById, 
    updateProperty,
    deleteProperty } = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

//public
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// protected
router.post('/properties', authMiddleware, createProperty);
router.get('/properties', authMiddleware, getProperties);
router.put('/properties/:id', authMiddleware, updateProperty);
router.delete('/properties/:id', authMiddleware, deleteProperty);

module.exports = router;