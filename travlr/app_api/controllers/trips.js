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

const tripsAddtrip=async(req, res) =>{
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
   });

   const q = await newTrip.save();
   
   if (!q) {
    // Database returned no data
    return res
        .status(400)
        .json({ err });
} else { 
    return res
        .status(201)
        .json(q);
}
};


// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
      Trip.findOneAndUpdate({'code': req.params.tripCode },{
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      }, { new: true })
      .then(trip => {
        if (!trip) {
          return res
            .status(404)
            .send({
              message: "Trip not found with code " + req.params.tripCode
            });
        }
        res.send(trip);
      })
      .catch(err => {
        if (err.kind === 'ObjectId') {
          return res
            .status(404)
            .send({
              message: "Trip not found with code " + req.params.tripCode
            });
        }
        return res
          .status(500)
          .json(err);
      });
    });
  };

    const Trip = require('../models/trip'); // Import your Trip model here

const getAuthor = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    User
      .findOne({ email: req.payload.email })
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({
              "message": "User not found"
            });
        } else if (err) {
          console.log(err);
          return res
            .status(404)
            .json(err);
        }
        callback(req, res, user.name);
      });
  } else {
    return res
      .status(404)
      .json({
        "message": "User not found"
      });
  }
};

    module.exports = {
        tripsList,
        tripsFindByCode,
        tripsAddtrip,
        tripsUpdateTrip
    };