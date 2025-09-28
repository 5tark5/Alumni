// packages
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from "cors"; 

// routes
import instituteRoute from "./routes/instituteRoute.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/institute', instituteRoute);

// Server startup
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});