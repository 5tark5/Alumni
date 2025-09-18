const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    recruiterName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    companyWebsite: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recruiter', recruiterSchema);