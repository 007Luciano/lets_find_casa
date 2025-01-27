const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        area: { type: String, required: true },
        neighborhood: { type: String, required: true },
        city: { type: String, required: true },
    },
    pricePerMonth: { type: Number, required: true },
    details: {
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        housingType: { type: String, enum: ['Condo', 'House', 'Apartment'], required: true },
    },
    media: [String], // Array of media file paths
    availabilityStatus: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);