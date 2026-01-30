const express = require('express');
const { register, login, forgotPassword, resetPassword } = require('../controllers/auth.controller');
const { googleLogin, linkedinCallback, githubLogin } = require('../controllers/socialAuth.controller');
const { getMe, getUserById, getAllUsers } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.post("/google", googleLogin);

router.get("/callback", linkedinCallback);

router.post("/github", githubLogin);

router.get("/me", protect, getMe);

router.get("/", protect, getAllUsers);

router.get("/:id", protect, getUserById);

module.exports = router;
