import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import './Signup.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(''); 
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            setSuccess('Login successful!');
            setError('');
            localStorage.setItem('token', response.data.token); // Save JWT token to local storage

            // Decode token to get user role
            const decoded = jwt_decode(response.data.token);
            const userRole = decoded.role;

            // Redirect based on role
            if (userRole === 'admin') {
                navigate('/admin-dashboard');
            } else if (userRole === 'owner') {
                navigate('/owner-dashboard');
            } else if (userRole === 'renter') {
                navigate('/renter-dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials.');
            setSuccess('');
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Login</h2>
            <p className="signup-subtitle">Welcome back! Please log in to continue.</p>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
            <form className="signup-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    className="signup-input"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="signup-input"
                    required
                />
                <button className="signup-button" type="submit">Login</button>
            </form>
             <div className="login-link-container">
                <span>Already have an account?</span>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}

export default Login;