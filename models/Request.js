const mongoose = require('mongoose');

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
    location: {
        type: Array,
        required: true
    }
})
module.exports = User = mongoose.model('request', RequestSchema);
