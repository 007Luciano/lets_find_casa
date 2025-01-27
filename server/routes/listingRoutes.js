const express = require('express');
const multer = require('multer');
const Listing = require('../models/Listing');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post('/upload', upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, price, location } = req.body;

        // Store the listing data in the database
        const newListing = new Listing({
            title,
            description,
            price,
            location,
            images: req.files.map(file => file.filename),
        });

        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload listing' });
    }
});

router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
});

module.exports = router;