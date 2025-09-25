const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, getAllUsers, getUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

router.put('/resetpassword/:token', resetPassword);

router.get('/users', getAllUsers);

router.get('/:id', getUser);

module.exports = router;