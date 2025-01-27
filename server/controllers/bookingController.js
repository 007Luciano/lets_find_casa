const Booking = require('../models/Booking');
const Property = require('../models/Property');

// Renter creates a booking
const createBooking = async (req, res) => {
    const { propertyId } = req.body;

    try {
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const booking = new Booking({
            property: propertyId,
            renter: req.user._id,
            owner: property.owner, 
        });

        await booking.save();
        res.status(201).json({ message: 'Booking request sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create booking', error: error.message });
    }
};

// Owner gets all booking requests
const getBookingsForOwner = async (req, res) => {
    try {
        const bookings = await Booking.find({ owner: req.user._id })
            .populate('property')
            .populate('renter', 'fullName email phoneNumber');

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
    }
};

// Owner updates booking status
const updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findById(id).populate('renter', 'fullName email phoneNumber');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this booking' });
        }

        booking.status = status;
        await booking.save();

        if (status === 'Accepted') {
            res.json({
                message: 'Booking accepted',
                renterContact: {
                    name: booking.renter.fullName,
                    email: booking.renter.email,
                    phone: booking.renter.phoneNumber,
                },
            });
        } else {
            res.json({ message: 'Booking rejected' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update booking status', error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookingsForOwner,
    updateBookingStatus,
};