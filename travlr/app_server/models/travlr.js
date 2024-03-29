const mongoose = require('mongoose');

// Define the trip schema
const tripSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // Added unique index
    name: { type: String, required: true },
    length: { type: String, required: true },
    start: { type: Date, required: true },
    resort: { type: String, required: true },
    perPerson: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Trip', tripSchema); // Changed model name to 'Trip' (singular form)