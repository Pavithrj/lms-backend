const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // you can use "outlook", "yahoo", or SMTP settings
        auth: {
            user: process.env.SMTP_EMAIL, // your email
            pass: process.env.SMTP_PASSWORD, // your email app password
        },
    });

    const mailOptions = {
        from: `"LMS Support" <${process.env.SMTP_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html, // optional if you want styled emails
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
