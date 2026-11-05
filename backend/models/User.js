const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['Founder', 'Investor', 'Mentor'],
        default: 'Founder'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'Users' // Dedicated Users collection in MongoDB Atlas
});

module.exports = mongoose.model('User', userSchema, 'Users');
