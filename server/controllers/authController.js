const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    const { fullName, email, password, phoneNumber, role } = req.body;

    // validation
    if (!fullName || !email || !password || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        });

        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        console.error('Signup error:', error); // Log error for debugging
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

//get user data
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude the password
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Login error:', error); // Log error for debugging
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};