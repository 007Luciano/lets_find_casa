import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [formData, setFormData] = useState({ 
        fullName: '', 
        email: '', 
        password: '', 
        phoneNumber: '', 
        role: '' 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', formData);
            navigate('/login', { state: { message: 'Signup successful! You can now log in.' } });
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error signing up. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Signup</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    name="fullName"
                    className="signup-input"
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                />
                <input
                    name="email"
                    className="signup-input"
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    name="password"
                    type="password"
                    className="signup-input"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <input
                    name="phoneNumber"
                    className="signup-input"
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                />
                <select
                    name="role"
                    className="signup-select"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="renter">Renter</option>
                    <option value="owner">Owner</option>
                </select>
                <button type="submit" className="signup-button">Signup</button>
            </form>
            <div className="login-link-container">
                <span>Already have an account?</span>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Signup;