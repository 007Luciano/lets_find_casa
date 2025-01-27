const Booking = require('../models/Booking');
const Property = require('../models/Property');

// Get bookings of the renter
exports.getRenterBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ renter: req.user.id }).populate('property');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings.' });
    }
};

// Book a property
exports.bookProperty = async (req, res) => {
    const { propertyId, startDate, endDate } = req.body;
    try {
        const property = await Property.findById(propertyId);
        if (!property) return res.status(404).json({ message: 'Property not found.' });

        const booking = new Booking({
            property: propertyId,
            renter: req.user.id,
            startDate,
            endDate
        });

        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error booking property.' });
    }
};