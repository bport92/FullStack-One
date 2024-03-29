const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// Build the connection string and set the connection options.
const connect = () => {
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows specific listener for graceful shutdown
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

// Graceful Shutdown
const gracefulShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        process.exit(0);
    });
};

// Event Listeners to process graceful shutdowns
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart');
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination');
});

process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown');
});

// Make initial connection to DB
connect();

module.exports = mongoose;