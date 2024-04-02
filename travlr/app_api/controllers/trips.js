const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and json message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // No filter, return all records 
        .exec();
    // Uncomment the following line to show results of query on the console
    // console.log(q);

    if (!q || q.length === 0) { // Check if q is empty or not
        // Database returned no data
        return res.status(404).json({ error: 'No trips found' });
    } else {
        // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// JSON message to the requesting client

const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) // Return single Record
        .exec();

    // Uncomment the following line to show results of query on the console
    // console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json({ err });
    } else { // Return resulting trip
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};