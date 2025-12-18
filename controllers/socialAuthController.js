const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getAccessToken = async (code) => {
    const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        redirect_uri: "http://localhost:5000/api/social-auth/callback"
    });
    const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const accessToken = await response.json();
    return accessToken;
};

const getUserData = async (accessToken) => {
    const response = await fetch("https://api.linkedin.com/v2/userinfo", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const userData = await response.json();
    return userData;
};

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

exports.linkedinCallback = async (req, res, next) => {
    try {
        const { code } = req.query;
        if (!code) {
            return res.status(400).json({ message: "Missing code" });
        }

        const tokenData = await getAccessToken(code);
        const userData = await getUserData(tokenData.access_token);

        let user = await User.findOne({ email: userData.email });

        if (!user) {
            user = await User.create({
                name: userData.name,
                email: userData.email,
                avatar: userData?.picture,
                authProvider: "linkedin",
                providerId: userData.sub
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
            secure: false,
            path: "/"
        });

        res.redirect("http://localhost:5173/");
    } catch (error) {
        next(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};