import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OwnerDashboard.css";
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");

    // Fetch properties
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get("http://localhost:5000/api/owner/properties", config);
                setProperties(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch properties.");
            }
        };

        fetchProperties();
    }, []);

    // Fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get("http://localhost:5000/api/bookings", config);
                setBookings(response.data);
            } catch (err) {
                console.error("Failed to fetch bookings", err);
            }
        };

        fetchBookings();
    }, []);

    const updateBookingStatus = async (bookingId, status) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.put(
                `http://localhost:5000/api/bookings/${bookingId}`,
                { status },
                config
            );
            alert(`Booking ${status}`);
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === bookingId ? { ...booking, status } : booking
                )
            );
        } catch (err) {
            console.error("Failed to update booking status", err);
        }
    };

    return (
        <div className="owner-dashboard">
            <Navbar/>
            <h2>Owner Dashboard</h2>
            <Link to="/add-property" className="add-property-button">
                Add New Property
            </Link>
            {error && <p className="error">{error}</p>}

            {/* Property Management Section */}
            <div className="property-list">
                {properties.map((property) => (
                    <div key={property._id} className="property-card">
                        <h3>{property.title}</h3>
                        <div className="property-media">
                            {property.media && property.media.length > 0 ? (
                                property.media.map((mediaUrl, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:5000/${mediaUrl}`}
                                        alt={`Property Media ${index + 1}`}
                                    />
                                ))
                            ) : (
                                <p>No media available</p>
                            )}
                        </div>
                        <p>{property.description}</p>
                        <p>
                            <strong>Price:</strong> ${property.pricePerMonth}
                        </p>
                        <p>
                            <strong>Location:</strong>{" "}
                            {property.location?.area}, {property.location?.neighborhood},{" "}
                            {property.location?.city}
                        </p>
                        <p>
                            <strong>Bedrooms:</strong>{" "}
                            {property.details?.bedrooms || "Not specified"}
                        </p>
                        <p>
                            <strong>Bathrooms:</strong>{" "}
                            {property.details?.bathrooms || "Not specified"}
                        </p>
                        <p>
                            <strong>Housing Type:</strong>{" "}
                            {property.details?.housingType || "Not specified"}
                        </p>
                        <p>
                            <strong>Availability:</strong>{" "}
                            {property.availabilityStatus ? "Available" : "Not Available"}
                        </p>
                        <div className="property-actions">
                            <Link
                                to={`/edit-property/${property._id}`}
                                className="edit-button"
                            >
                                Edit
                            </Link>
                            <button
                                className="delete-button"
                                onClick={async () => {
                                    if (
                                        window.confirm(
                                            "Are you sure you want to delete this property?"
                                        )
                                    ) {
                                        try {
                                            const token = localStorage.getItem("token");
                                            const config = {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            };
                                            await axios.delete(
                                                `http://localhost:5000/api/owner/properties/${property._id}`,
                                                config
                                            );
                                            setProperties((prev) =>
                                                prev.filter((p) => p._id !== property._id)
                                            );
                                        } catch (err) {
                                            alert(
                                                err.response?.data?.message ||
                                                    "Failed to delete property."
                                            );
                                        }
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Booking Management Section */}
            <div className="booking-list">
                <h2>Booking Requests</h2>
                {bookings.map((booking) => (
                    <div key={booking._id} className="booking-card">
                        <h3>{booking.property.title}</h3>
                        <p>Renter: {booking.renter.fullName}</p>
                        <p>Status: {booking.status}</p>
                        {booking.status === "Pending" && (
                            <div>
                                <button
                                    className="approve-button"
                                    onClick={() =>
                                        updateBookingStatus(booking._id, "Approved")
                                    }
                                >
                                    Approve
                                </button>
                                <button
                                    className="reject-button"
                                    onClick={() =>
                                        updateBookingStatus(booking._id, "Rejected")
                                    }
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OwnerDashboard;
