import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Navbar.css';


const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    let userRole = '';

    if (token) {
        try {
            const decoded = jwtDecode(token); 
            userRole = decoded.role;
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src="/images/logo1.png" alt="Logo" />
            </Link>
            <nav className="nav">
                <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                <label htmlFor="nav-toggle" className="nav-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <ul className="nav-menu">
                    <li><Link to="/">Home</Link></li>
                    {!token && (
                        <>
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                    {token && userRole === 'admin' && (
                        <>
                            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
                            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                        </>
                    )}
                    {token && userRole === 'owner' && (
                        <>
                            <li><Link to="/owner-dashboard">Owner Dashboard</Link></li>
                            <li><Link to="/add-property">Add Property</Link></li>
                            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                        </>
                    )}
                    {token && userRole === 'renter' && (
                        <>
                            <li><Link to="/properties">Rent</Link></li>
                            <li><Link to="/renter-dashboard">Renter Dashboard</Link></li>
                            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
        
    );
};

export default Navbar;
