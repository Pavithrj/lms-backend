const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    pic: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Team', teamSchema);
