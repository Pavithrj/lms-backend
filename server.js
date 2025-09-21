const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middleware/error');
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Welcome to the Learning Management System API edited.");
    console.log("Learning Management System API is running edited.");
});

app.listen(PORT, async () => {
    console.log(`Learning Management System API is running on http://localhost:${PORT}`);

    await connectDB();
});