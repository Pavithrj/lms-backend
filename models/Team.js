const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    socials: {
        type: [socialSchema],
        required: true
    }
});

module.exports = mongoose.model("Team", teamSchema);
