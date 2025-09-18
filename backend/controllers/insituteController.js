const Institute = require("../models/institueModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../middlewares/asyncHandler");
const connectDB = require("../config/db");

const signupInstitute = asyncHandler(async (req, res) => {
  const { name, institutePassword, instituteEmail, institutePhone } = req.body;

  //Connecting MongoDB to institute Database and only connect Mongodb here to take datatype not in index.js 
  await connectDB("institute");
  const existing = await Institute.findOne({ instituteEmail });
  if (existing) {
    res.status(400);
    throw new Error("Institute Already Exists");
  }

  const hashedPassword = await bcrypt.hash(institutePassword, 10);

  const newInstitute = new Institute({
    name,
    instituteEmail,
    institutePhone,
    institutePassword: hashedPassword,
  });

  await newInstitute.save();

  res.status(201).json({
    message: "SignUp Successfully",
    institute: newInstitute,
  });
});

module.exports = { signupInstitute };
