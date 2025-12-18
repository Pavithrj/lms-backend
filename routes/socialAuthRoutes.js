const express = require('express');
const { createGoogleLogin, linkedinCallback, getUser } = require('../controllers/socialAuthController');

const router = express.Router();

router.post("/google-login", createGoogleLogin);

router.get("/callback", linkedinCallback);

router.get("/get-user", getUser);

module.exports = router;
