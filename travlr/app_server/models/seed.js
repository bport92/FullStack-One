// Bring in the DB connection and the Trip schema
const mongoose = require('../database/db'); // Assuming this line connects to the database
const Trip = require('./travlr');

// Read seed data from json file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// delete any existing records, then insert seed data
const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        await Trip.insertMany(trips);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Close the MongoDB connection and exit
const closeConnection = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
        process.exit(1); // Exiting with non-zero code to indicate failure
    }
};

// Execute seeding and closing connection
async function main() {
    await seedDB();
    await closeConnection();
}

main();