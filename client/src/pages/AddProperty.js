import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProperty.css';
import Navbar from '../components/Navbar';

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: { area: '', neighborhood: '', city: '' },
        pricePerMonth: '',
        details: { bedrooms: '', bathrooms: '', housingType: '' },
        media: [],
        availabilityStatus: true,
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('location.')) {
            const [_, field] = name.split('.');
            setFormData({
                ...formData,
                location: { ...formData.location, [field]: value },
            });
        } else if (name.includes('details.')) {
            const [_, field] = name.split('.');
            setFormData({
                ...formData,
                details: { ...formData.details, [field]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleMediaUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, media: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            for (const key in formData) {
                if (key === 'media') {
                    formData.media.forEach((file) => data.append('media', file));
                } else if (typeof formData[key] === 'object') {
                    data.append(key, JSON.stringify(formData[key]));
                } else {
                    data.append(key, formData[key]);
                }
            }

            await axios.post(
                'http://localhost:5000/api/owner/properties',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Property added successfully!');
            navigate('/owner-dashboard');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Error adding property.');
        }
    };

    return (
       <div className='add-property'>
        <Navbar/>
        <form onSubmit={handleSubmit} className="add">
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className='in'
            />
            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <div className="inline-fields">
                <input
                    type="text"
                    name="location.area"
                    placeholder="Area"
                    value={formData.location.area}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="location.neighborhood"
                    placeholder="Neighborhood"
                    value={formData.location.neighborhood}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="location.city"
                    placeholder="City"
                    value={formData.location.city}
                    onChange={handleChange}
                />
            </div>
            <div className="inline-fields">
            <input
                type="number"
                name="pricePerMonth"
                placeholder="Price per Month"
                value={formData.pricePerMonth}
                onChange={handleChange}
            />
            <input
                type="number"
                name="details.bedrooms"
                placeholder="Bedrooms"
                value={formData.details.bedrooms}
                onChange={handleChange}
            />
            <input
                type="number"
                name="details.bathrooms"
                placeholder="Bathrooms"
                value={formData.details.bathrooms}
                onChange={handleChange}
            />
            </div>
            
            <select
                name="details.housingType"
                value={formData.details.housingType}
                onChange={handleChange}
            >
                <option value="">Select Housing Type</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
            </select>
            <input
                type="file"
                multiple
                onChange={handleMediaUpload}
            />
            <label>
                Available:
                <input
                    type="checkbox"
                    name="availabilityStatus"
                    checked={formData.availabilityStatus}
                    onChange={(e) =>
                        setFormData({ ...formData, availabilityStatus: e.target.checked })
                    }
                />
            </label>
            <button type="submit">Add Property</button>
        </form>
        </div>
    );
};

export default AddProperty;
