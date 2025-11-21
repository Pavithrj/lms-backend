const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
    try {
        const { name, emailId, feedbackType, feedbackMessage } = req.body;

        const wordCount = feedbackMessage.trim().split(/\s+/).length;
        if (wordCount > 50) {
            return res.status(400).json({
                success: false,
                message: "Feedback message cannot exceed 50 words."
            });
        }

        const newFeedback = new Feedback({
            name,
            emailId,
            feedbackType,
            feedbackMessage
        });

        await newFeedback.save();

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully!",
            data: newFeedback
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: feedback.length,
            data: feedback
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
