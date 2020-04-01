const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName: {
        type: mongoose.Schema.Types.String,
        ref: 'user'
    },
    lastName: {
        type: mongoose.Schema.Types.String,
        ref: 'user'
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
