
const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
    const { title, description, price, location, imageUrl } = req.body;
    try {
        const newProperty = new Property({
            title,
            description,
            price,
            location,
            imageUrl,
            owner: req.user.id, 
        });

        await newProperty.save();
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create property' });
    }
};

// Get all properties
exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find({});
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch properties' });
    }
};

exports.getProperties = async (req, res) => {
    const { city, area, minPrice, maxPrice, bedrooms } = req.query;

    try {
        // Dynamic query object
        const query = {};

        if (city) query['location.city'] = city;
        if (area) query['location.area'] = area;
        if (minPrice) query.pricePerMonth = { ...query.pricePerMonth, $gte: Number(minPrice) };
        if (maxPrice) query.pricePerMonth = { ...query.pricePerMonth, $lte: Number(maxPrice) };
        if (bedrooms) query['details.bedrooms'] = Number(bedrooms);

        const properties = await Property.find(query);
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch properties' });
    }
};


exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.status(200).json(property);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch property' });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProperty);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update property' });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Property.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete property' });
    }
};
