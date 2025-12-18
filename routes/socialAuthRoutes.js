const express = require('express');
const { createGoogleLogin, getUser } = require('../controllers/socialAuthController');

const router = express.Router();

router.post("/google-login", createGoogleLogin);

router.get("/get-user", getUser);

module.exports = router;
