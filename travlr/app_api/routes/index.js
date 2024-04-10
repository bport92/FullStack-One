const express = require('express'); //Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we wil route
const tripsController = require('../controllers/trips');

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); // GET Method routes tripList
    
//GET Method routes tripsFindByCode - requires parameters
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode); // GET Method routes tripList    

    module.exports = router;