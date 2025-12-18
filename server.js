const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const socialAuthRoutes = require('./routes/socialAuthRoutes');
const teamRoutes = require('./routes/teamRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const errorHandler = require('./middleware/error');
const uiRoutes = require('./routes/uiRoutes');
const path = require('path');

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/auth", authRoutes);
app.use("/api/social-auth", socialAuthRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/feedback", feedbackRoutes);

app.use(errorHandler);

app.use("/", uiRoutes);

app.listen(PORT, async () => {
    await connectDB();

    console.log(`Learning Management System API is running on http://localhost:${PORT}`);
});
