const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");
const Property = require("../models/Property");
const User = require("../models/User");

const router = express.Router();

// Create a booking
router.post("/", authenticate, async (req, res) => { 
    const { propertyId } = req.body;

    try {
        const property = await Property.findById(propertyId).populate("owner");

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        if (!property.availabilityStatus) {
            return res.status(400).json({ message: "Property is not available for booking" });
        }

        const booking = new Booking({
            property: propertyId,
            renter: req.user._id,
            owner: property.owner._id,
        });

        await booking.save();

        res.status(201).json({ message: "Booking request sent to the owner" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update booking status
router.put("/:id", authenticate, async (req, res) => { 
    const { id } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this booking" });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({ message: `Booking status updated to ${status}` });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get bookings for a user
router.get("/", authenticate, async (req, res) => { 
    try {
        const bookings = await Booking.find({ $or: [{ owner: req.user._id }, { renter: req.user._id }] })
            .populate("property")  
            .populate("renter", "fullName email phoneNumber")  
            .populate("owner", "fullName email phoneNumber"); 

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;