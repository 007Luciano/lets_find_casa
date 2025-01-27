import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';


const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwt_decode(token);
        const userRole = decoded.role;

        if (allowedRoles && !allowedRoles.includes(userRole)) {
            return <Navigate to="/" replace />;
        }

        return children;
    } catch (error) {
        console.error('Invalid token:', error);
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;