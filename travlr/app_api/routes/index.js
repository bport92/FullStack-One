const express = require('express'); //Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we wil route
const tripsController = require('../controller/trips');

// define route for our trips endpoint
router
    .route('trips')
    .get(tripsController.tripsList); // GET Method routes tripList

// Get Method routes tripsFindByCOde - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

    module.exports = router;