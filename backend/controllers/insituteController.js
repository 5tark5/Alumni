import Institute from "../models/institueModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const signupInstitute = asyncHandler(async (req, res) => {
  const { name, institutePassword, instituteEmail, institutePhone } = req.body;

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

  try {
    await newInstitute.save();

    createToken(res, newInstitute._id);

    res.status(201).json({
      _id: newInstitute._id,
      name: newInstitute.name,
      instituteEmail: newInstitute.instituteEmail,
      institutePhone: newInstitute.institutePhone,
      message: "SignUp and Login Successful",
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid institute data. Please check your inputs.");
  }

});

const loginInstitute = asyncHandler(async (req, res) => {
  const { institutePassword, instituteEmail } = req.body;
  const institute = await Institute.findOne({ instituteEmail });

  // Check if institute exists AND if the password matches
  if (institute && (await bcrypt.compare(institutePassword, institute.institutePassword))) {
    createToken(res, institute._id);

    res.status(200).json({
      _id: institute._id,
      name: institute.name,
      instituteEmail: institute.instituteEmail,
      institutePhone: institute.institutePhone,
      message: "Login Successfully",
    });
  } else {
    // Use a single, secure error message with a 401 status
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const logoutInstitute = asyncHandler(async(req,res)=>{
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
})

// ✅ Accepts and saves the new profileImage URL
// In controllers/instituteController.js

// --- GET CURRENT INSTITUTE PROFILE ---
const getCurrentInstitute = asyncHandler(async (req, res) => {
  // The institute ID is attached to req.institute by the auth middleware
  const institute = await Institute.findById(req.institute._id);

  if (institute) {
    res.json({
      _id: institute._id,
      name: institute.name,
      instituteEmail: institute.instituteEmail,
      institutePhone: institute.institutePhone,
      profileImage: institute.profileImage,
      address: institute.address,
      city: institute.city,
      state: institute.state,
      zipCode: institute.zipCode,
      completeProfile: institute.completeProfile,
      country: institute.country,
    });
  } else {
    res.status(404);
    throw new Error("Institute not found");
  }
});

const updateCurrentInstitute = asyncHandler(async (req, res) => {
  const institute = await Institute.findById(req.institute._id);

  if (institute) {
    // Check if the new email is already taken by another user
    if ( req.body.instituteEmail && req.body.instituteEmail !== institute.instituteEmail ) {
      const emailExists = await Institute.findOne({ instituteEmail: req.body.instituteEmail });
      if (emailExists) {
        res.status(400);
        throw new Error("Email is already in use");
      }
    }

    institute.name = req.body.name || institute.name;
    institute.instituteEmail = req.body.instituteEmail || institute.instituteEmail;
    institute.institutePhone = req.body.institutePhone || institute.institutePhone;
    institute.profileImage = req.body.profileImage || institute.profileImage;
    institute.address = req.body.address || institute.address;
    institute.country = req.body.country || institute.country; 
    institute.city = req.body.city || institute.city;
    institute.state = req.body.state || institute.state;
    institute.zipCode = req.body.zipCode || institute.zipCode;

    // Automatically update the profile completion status
    if (institute.address && institute.city && institute.state && institute.zipCode) {
      institute.completeProfile = true;
    }

    // Conditionally update password if a new one is provided
    if (req.body.institutePassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.institutePassword, salt);
      institute.institutePassword = hashedPassword;
    }

    const updatedInstitute = await institute.save();

    res.json({
      _id: updatedInstitute._id,
      name: updatedInstitute.name,
      instituteEmail: updatedInstitute.instituteEmail,
      institutePhone: updatedInstitute.institutePhone,
      profileImage: updatedInstitute.profileImage,
      address: updatedInstitute.address,
      country: updatedInstitute.country, 
      city: updatedInstitute.city,
      state: updatedInstitute.state,
      zipCode: updatedInstitute.zipCode,
      completeProfile: updatedInstitute.completeProfile,
      message: "Profile updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Institute not found");
  }
});

export { signupInstitute, loginInstitute, logoutInstitute, updateCurrentInstitute, getCurrentInstitute };