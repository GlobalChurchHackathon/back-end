const mongoose = require('mongoose');

const ChurchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    website: {
        type: String,
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
    socialMedia: {
        socialMedia1: {
            type: String
        },
        socialMedia2: {
            type: String
        }
    }
})
module.exports = User = mongoose.model('church', ChurchSchema);
