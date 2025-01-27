import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PropertyListing.css';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/properties');
                setProperties(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load properties');
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <p>Loading properties...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="property-listing">
            <h2>Available Properties</h2>
            <div className="properties-grid">
                {properties.map((property) => (
                    <div key={property._id} className="property-card">
                        <img
                            src={property.media[0] || '/default-property.jpg'}
                            alt={property.title}
                            className="property-image"
                        />
                        <div className="property-details">
                            <h3>{property.title}</h3>
                            <p>{property.location.city}, {property.location.area}</p>
                            <p>Bedrooms: {property.details.bedrooms} | Bathrooms: {property.details.bathrooms}</p>
                            <p>Price: ${property.pricePerMonth} / month</p>
                            <Link to={`/property/${property._id}`} className="view-details">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyListing;
