const mongoose = require('mongoose');
const dns = require('dns');
const path = require('path');

// Support loading .env from project root or backend folder
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
require('dotenv').config();

// Fix for Windows DNS resolution with MongoDB Atlas SRV records
try {
    dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
    // Ignore if not supported in environment
}

let isConnected = false;

const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri || !uri.startsWith('mongodb')) {
        console.log('ℹ️ [DB] Running with in-memory demo storage. (Add MONGODB_URI in .env to connect MongoDB Atlas)');
        return false;
    }
    try {
        await mongoose.connect(uri);
        isConnected = true;
        console.log('🚀 [DB] Successfully connected to MongoDB Atlas!');
        console.log(`📦 [DB] Target Database: "${mongoose.connection.name}", Target Collection: "StartupGuru"`);
        return true;
    } catch (err) {
        console.warn('⚠️ [DB] MongoDB Atlas connection failed:', err.message);
        console.warn('👉 Reminder: Ensure your IP is whitelisted (0.0.0.0/0) in MongoDB Atlas under Network Access.');
        isConnected = false;
        return false;
    }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
