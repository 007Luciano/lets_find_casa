import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './RenterDashboard.css';

const RenterDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:5000/api/bookings", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log(response.data); 

                const renterBookings = response.data.filter(
                    (booking) => booking.renter._id === JSON.parse(atob(token.split('.')[1])).id
                );

                setBookings(renterBookings);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
                setError(err.response?.data?.message || 'An error occurred while fetching bookings.');
            }
        };

        fetchBookings();
    }, []);

    // Helper function to format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
    };

    return (
        <div className="renter-dashboard">
            <Navbar />
            <h2>Your Bookings</h2>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>
                        <h3>{booking.property.title}</h3>
                        <p>Status: {booking.status}</p>

                        <p><strong>Booking Date:</strong> {formatDate(booking.createdAt)}</p>

                        {booking.status === "Approved" && booking.owner && (
                            <div className="owner-contact">
                                <p>You can now contact the owner by using the details below</p>
                                <h4>Owner Contact:</h4>
                                <p><strong>Name:</strong> {booking.owner.fullName}</p>
                                <p><strong>Email:</strong> {booking.owner.email}</p>
                                <p><strong>Phone:</strong> {booking.owner.phoneNumber}</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RenterDashboard;