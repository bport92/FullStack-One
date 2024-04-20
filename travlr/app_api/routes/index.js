const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt@6.1.0");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"],
});

// This is where we import the controllers we wil route
const tripsController = require('../controllers/trips');
const authController = require('../controller/authentication');
// define route for our trips endpoint

router
    .route('/login')
    .post(authController.login);
 
router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip);
    
//GET Method routes tripsFindByCode - requires parameters
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode) // GET Method routes tripList    
    .put(auth, tripsController.tripsUpdateTrip);

    module.exports = router;