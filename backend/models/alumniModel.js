import mongoose from "mongoose";
import { required } from "nodemon/lib/config";

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
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
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

  // location details
  zipCode: {
    type: String,
    trim: true,
    required: true,
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
});

export default mongoose.model("Alumni", alumniSchema);
