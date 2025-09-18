// packages 
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
dotenv.config();

const instituteLogin = require("./routes/instituteLogin.js");


const port = process.env.PORT || 5000;

// connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/institute', instituteLogin);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
