// packages
import express from "express";
import dotenv from "dotenv";
import path from "path";  
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// routes
import instituteRoute from "./routes/instituteRoute.js";
import studentRoute from "./routes/studentRoute.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/institute', instituteRoute);
app.use('/student', studentRoute);  


// Server startup
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});