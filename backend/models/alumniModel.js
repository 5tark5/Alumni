const mongoose = require("mongoose");



const alumniSchema = new mongoose.Schema({
  // personal details
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
  },
  gender: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },

  //Educational details
  degree: {
    type: String,
    trim: true,
    required: true,
  },
  branch: {
    type: String,
    trim: true,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },

  // after registration details
  linkedIn: {
    type: String,
    trim: true,
  },

  // location details
  zipCode: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },

  // professional details
  currentOrganization: {
    type: String,
    trim: true,
  },
  designation: {
    type: String,
    trim: true,
  },


  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },


  // additional details
  homeTown: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
    trim: true,
  },

});

const Alumni = mongoose.model("Alumni", alumniSchema);
export default Alumni ;