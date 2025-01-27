const Property = require('../models/Property');

// Get properties owned by the owner
exports.getOwnerProperties = async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching properties.' });
    }
};

// Add a new property
exports.addProperty = async (req, res) => {
    const {
        title,
        description,
        location,
        pricePerMonth,
        details,
        availabilityStatus,
    } = req.body;

    try {
        const media = req.files.map(file => file.path); // Get file paths from Multer

        const property = new Property({
            title,
            description,
            location: JSON.parse(location), // Parse location object
            pricePerMonth,
            details: JSON.parse(details), // Parse details object
            media,
            availabilityStatus,
            owner: req.user.id,
        });

        const savedProperty = await property.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Error adding property.', error: error.message });
    }
};


// Get a single property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        // Check if the property exists
        if (!property) {
            return res.status(404).json({ message: 'Property not found.' });
        }

        // Ensure the property belongs to the authenticated owner
        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. Not your property.' });
        }

        res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching property.' });
    }
};

// Update a property
exports.updateProperty = async (req, res) => {
    const {
        title,
        description,
        location,
        pricePerMonth,
        details,
        media,
        availabilityStatus,
    } = req.body;

    try {
        let property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found.' });

        // Check if the property belongs to the owner
        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. Not your property.' });
        }

        // Update property
        property.title = title || property.title;
        property.description = description || property.description;
        property.location = location || property.location;
        property.pricePerMonth = pricePerMonth || property.pricePerMonth;
        property.details = details || property.details;
        property.media = media || property.media;
        property.availabilityStatus = availabilityStatus || property.availabilityStatus;

        const updatedProperty = await property.save();
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Error updating property.' });
    }
};


// Delete a property
exports.deleteProperty = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found.' });

        // Check if the property belongs to the owner
        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. Not your property.' });
        }

        await Property.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Property deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting property.' });
    }
};