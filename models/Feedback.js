const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true
    },
    feedbackType: {
        type: String,
        required: true,
        enum: ["General Feedback", "Bug Report", "Feature Request", "Complaint", "Compliment"]
    },
    feedbackMessage: {
        type: String,
        required: true,
        minlength: 10,
        validate: {
            validator: function (value) {
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 50;
            },
            message: "Feedback message cannot exceed 50 words."
        }
    },
    status: {
        type: String,
        enum: ["Pending", "Reviewed", "Resolved"],
        default: "Pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
