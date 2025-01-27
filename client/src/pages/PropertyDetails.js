import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';
import "./PropertyDetails.css";

function PropertyDetails() {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/properties/${propertyId}`);
                setProperty(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch property details.");
            }
        };

        fetchPropertyDetails();
    }, [propertyId]);

    const handleBooking = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/bookings",
                { propertyId: property._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to book the property.");
        }
    };
    

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!property) {
        return <p>Loading property details...</p>;
    }

    return (
        <div className="property-details-container">
            <Navbar/>
            <div className="property-header">
                <h2>{property.title}</h2>
                <p className="property-location">{property.location.area}, {property.location.city}</p>
            </div>
            <div className="property-media">
                {property.media && property.media.length > 0 ? (
                    property.media.map((mediaUrl, index) => (
                        <img
                            key={index}
                            src={`http://localhost:5000/${mediaUrl}`}
                            alt={`Property Media ${index + 1}`}
                            className="property-image"
                        />
                    ))
                ) : (
                    <img
                        src="default-image.jpg"
                        alt="Default Property"
                        className="property-image"
                    />
                )}
            </div>
            <div className="property-info">
                <h3>Description</h3>
                <p>{property.description}</p>

                <h3>Details</h3>
                <ul>
                    <li><strong>Price:</strong> ${property.pricePerMonth} / month</li>
                    <li><strong>Bedrooms:</strong> {property.details.bedrooms}</li>
                    <li><strong>Bathrooms:</strong> {property.details.bathrooms}</li>
                    <li><strong>Housing Type:</strong> {property.details.housingType}</li>
                    <li><strong>Availability:</strong> {property.availabilityStatus ? "Available" : "Unavailable"}</li>
                </ul>
            </div>
            <button className="book-now-button" onClick={handleBooking}>
                Book Now
            </button>
            
        </div>
    );
}

export default PropertyDetails;