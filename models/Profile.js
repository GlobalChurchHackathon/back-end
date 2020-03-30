const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
    }
})

module.exports = User = mongoose.model('profile', ProfileSchema);
