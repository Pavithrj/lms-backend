const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/error');
const uiRoutes = require('./routes/uiRoutes');
const path = require('path');

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.use("/", uiRoutes);

app.listen(PORT, async () => {
    await connectDB();

    console.log(`Learning Management System API is running on http://localhost:${PORT}`);
});
