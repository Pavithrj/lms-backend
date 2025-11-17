const express = require('express');
const { createFeedback, getAllFeedback } = require('../controllers/feedbackController');

const router = express.Router();

router.post("/add", createFeedback);

router.get("/all", getAllFeedback);

module.exports = router;
