import mongoose from "mongoose";
import { required } from "nodemon/lib/config";
import { home } from "nodemon/lib/utils";

const studentSchema = new mongoose.Schema({
  // personal details
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
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
});

export default mongoose.model("Student", studentSchema);
