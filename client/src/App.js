import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import OwnerDashboard from './pages/OwnerDashboard';
import RenterDashboard from './pages/RenterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PropertyList from './pages/PropertyList';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import ProtectedRoute from './components/ProtectedRoute';
import PropertyListing from './components/PropertyListing';
import PropertyDetails from './pages/PropertyDetails';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/properties" element={<PropertyList />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/property-details/:propertyId" element={<PropertyDetails />} />

                
                
                {/* Admin Dashboard */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Owner Dashboard */}
                <Route
                    path="/owner-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['owner']}>
                            <OwnerDashboard />
                        </ProtectedRoute>
                    }
                />
                
                {/* Renter Dashboard */}
                <Route
                    path="/renter-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['renter']}>
                            <RenterDashboard />
                        </ProtectedRoute>
                    }
                />
                
                {/* Add Property (Owner Only) */}
                <Route
                    path="/add-property"
                    element={
                        <ProtectedRoute allowedRoles={['owner']}>
                            <AddProperty />
                        </ProtectedRoute>
                    }
                />
                
                {/* Edit Property (Owner Only) */}
                <Route path="/edit-property/:id" element={<EditProperty />} />

                <Route path="/HomePage" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;