import React, { useState } from 'react';
import axios from 'axios';

function AddPropertyForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        title: '',
        area: '',
        neighborhood: '',
        city: '',
        pricePerMonth: '',
        bedrooms: '',
        bathrooms: '',
        squareFootage: '',
        type: '',
        media: '',
        availabilityStatus: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/properties/add', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Property added successfully!');
            onSuccess(response.data); 
        } catch (err) {
            console.error(err);
            alert('Failed to add property. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
            <input name="area" placeholder="Area" value={formData.area} onChange={handleChange} required />
            <input name="neighborhood" placeholder="Neighborhood" value={formData.neighborhood} onChange={handleChange} required />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input name="pricePerMonth" type="number" placeholder="Price Per Month" value={formData.pricePerMonth} onChange={handleChange} required />
            <input name="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} required />
            <input name="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleChange} required />
            <input name="squareFootage" type="number" placeholder="Square Footage" value={formData.squareFootage} onChange={handleChange} required />
            <input name="type" placeholder="Type (e.g., Apartment, House)" value={formData.type} onChange={handleChange} required />
            <input name="media" placeholder="Media (Image URLs, comma-separated)" value={formData.media} onChange={handleChange} />
            <button type="submit">Add Property</button>
        </form>
    );
}

export default AddPropertyForm;
