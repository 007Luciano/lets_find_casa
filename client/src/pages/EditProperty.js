import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProperty = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: { area: '', neighborhood: '', city: '' },
        pricePerMonth: '',
        details: { bedrooms: '', bathrooms: '', housingType: '' },
        media: [],
        availabilityStatus: true,
    });
    const [currentMedia, setCurrentMedia] = useState([]); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`http://localhost:5000/api/owner/properties/${id}`, config);
                const property = response.data;

                setFormData({
                    title: property.title,
                    description: property.description,
                    location: property.location,
                    pricePerMonth: property.pricePerMonth,
                    details: property.details,
                    availabilityStatus: property.availabilityStatus,
                });
                setCurrentMedia(property.media); // Set current media files
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch property details.');
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

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

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put(`http://localhost:5000/api/owner/properties/${id}`, data, config);
            alert('Property updated successfully!');
            navigate('/owner-dashboard'); 
        } catch (err) {
            setError('Failed to update property.');
        }
    };

    if (loading) return <p>Loading property details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Edit Property</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
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
                <label>Current Media:</label>
                <ul>
                    {currentMedia.map((file, index) => (
                        <li key={index}>{file}</li>
                    ))}
                </ul>
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
                <button type="submit">Update Property</button>
            </form>
        </div>
    );
};

export default EditProperty;