const express = require('express');
const { signup, login, getUser } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authenticate, getUser);

module.exports = router;