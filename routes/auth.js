const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, getAllUsers, getUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);

router.post('/login', login);

router.get('/:id', getUser);

router.get('/users', getAllUsers);

router.post('/forgotpassword', forgotPassword);

router.put('/resetpassword/:token', resetPassword);

// router.post('/logout', logout);
// router.post('/refresh-token', refreshToken);

// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:token', resetPassword);
// router.put('/me/change-password', protect, changePassword);

// router.get('/me', protect, getCurrentUser);
// router.put('/me/update', protect, updateUser);
// router.delete('/me/delete', protect, deleteUser);

// router.get('/users', protect, getAllUsers);
// router.get('/users/:id', protect, getUser);

module.exports = router;