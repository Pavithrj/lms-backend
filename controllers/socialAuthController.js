const User = require('../models/User');
const jwt = require('jsonwebtoken');

// exports.createGoogleLogin = async (req, res, next) => {
//     try {
//         const { name, email, phoneNumber, avatar } = req.body;

//         let user;

//         user = await User.findOne({ email });

//         if (!user) {
//             const newUser = new User({ name, email, phoneNumber, avatar });

//             await newUser.save();
//             user = newUser;
//         }

//         user = user.toObject({ getters: true });

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         // res.cookie("access_token", token, {
//         //     httpOnly: true
//         // });

//         res.cookie("access_token", token, {
//             httpOnly: true,
//             sameSite: "lax",
//             secure: process.env.NODE_ENV === "production"
//         });

//         res.status(200).json({
//             success: true,
//             user
//         });
//     } catch (err) {
//         // res.status(500).json({
//         //     success: false,
//         //     error: err.message
//         // });

//         next(err);
//     }
// };

exports.createGoogleLogin = async (req, res) => {
    try {
        const { name, email, avatar, providerId } = req.body;

        if (!email || !providerId) {
            return res.status(400).json({
                success: false,
                message: "Missing Google user data"
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                avatar,
                authProvider: "google",
                providerId
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        res.status(200).json({
            success: true,
            user
        });

        if (!user) {
            return res.status(404).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err
        });

        next(err);
    }
};