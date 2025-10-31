const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    githubUrl: {
        type: String,
        required: true
    },
    xUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Team", teamSchema);
