const Institute = require("../models/institueModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

const loginInstitute = asyncHandler(async (req, res) => {
  try {
    await connectDB("institute");
    const { institutePassword, instituteEmail } = req.body;
    const institute = await Institute.findOne({ instituteEmail });
    if (!institute) {
      return res
        .status(404)
        .json({ message: "Email Doesn-t Exist \n Please SignUp first" });
    }
    const isMatch = await bcrypt.compare(
      institutePassword,
      institute.institutePassword
    );
    if (!isMatch) {
      return res.status(400).json({ messege: "Please Enter valid Password" });
    }
    const token = jwt.sign({ id: institute._id }, process.env.JWT_SECRET);
    res.status(200).json({message: "Login Susscesfully",token,instituteID: institute._id,});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", Error: err.message });
  }
});

module.exports = { signupInstitute, loginInstitute };
