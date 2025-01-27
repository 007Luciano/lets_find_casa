import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./PropertyList.css";
import Navbar from '../components/Navbar';
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
        city: "",
        area: "",
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const response = await axios.get(`http://localhost:5000/api/properties?${queryParams}`);
            setProperties(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch properties.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSearch = () => {
        fetchProperties();
    };

    const handleCardClick = (propertyId) => {
        navigate(`/property-details/${propertyId}`);
    };

    return (
        <div className="property-list-container">
            <Navbar/>
            <h2>Properties</h2>
            {error && <p className="error">{error}</p>}

            <div className="filters">
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={filters.city}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="area"
                    placeholder="Area"
                    value={filters.area}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="bedrooms"
                    placeholder="Bedrooms"
                    value={filters.bedrooms}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>


            <div className="property-list">
                {properties.map((property) => (
                    <div
                        key={property._id}
                        className="property-card"
                        onClick={() => handleCardClick(property._id)}
                    >
                        <img
                            src={
                                property.media && property.media.length > 0
                                    ? `http://localhost:5000/${property.media[0]}`
                                    : "default-image.jpg"
                            }
                            alt={property.title || "Property Image"}
                            className="property-image"
                        />
                        <div className="property-info">
                            <h3 className="property-title">{property.title}</h3>
                            <p className="property-location">{property.location.area}, {property.location.city}</p>
                            <p className="property-price">${property.pricePerMonth}</p>
                            <div className="property-details">
                                <div className="property-detail">
                                    <FaBed />
                                    <span>{property.details.bedrooms} Bedrooms</span>
                                </div>
                                <div className="property-detail">
                                    <FaBath />
                                    <span>{property.details.bathrooms} Bathrooms</span>
                                </div>
                                <div className="property-detail">
                                    <FaRulerCombined />
                                    <span>{property.details.squareFeet || "N/A"} sq ft</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PropertyList;
