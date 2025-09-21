const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// Optional: const sendEmail = require('../utils/sendEmail');

const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
    res.status(statusCode).json({ success: true, token });
};

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.create({ name, email, password, role });
        sendTokenResponse(user, 201, res);
    } catch (err) {
        // handle duplicate key (email) nicely
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide email and password' });

        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'No user with that email' });

        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

        try {
            // sendEmail({ to: user.email, subject: 'Password reset', text: `Reset URL: ${resetUrl}` });
            console.log('Password reset URL (send via email in production):', resetUrl);
            res.status(200).json({ success: true, data: 'Email sent' });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ success: false, message: 'Email could not be sent' });
        }
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        }).select('+password');

        if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};
