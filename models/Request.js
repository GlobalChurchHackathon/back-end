const mongoose = require('mongoose');

// geolocation schema for lng, lat
const GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates:{
        type: [Number],
        index: "2dsphere"
    }
});

const RequestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isClaimed: {
        type: Boolean,
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
    location: GeoSchema
})
module.exports = User = mongoose.model('request', RequestSchema);
