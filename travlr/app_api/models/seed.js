// Bring in the DB connection and the Trip schema
const mongoose = require('./db'); // Assuming this line connects to the database
const Trip = require('./travlr');

// Read seed data from json file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips); 
    };

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});