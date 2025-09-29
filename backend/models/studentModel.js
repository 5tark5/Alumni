import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  // personal details
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
  },
  studentEmail: {
    type: String,
    trim: true,
    unique : true,
    required: true,
  },
  studentPassword : {
    type: String,
    minLength : 8,
    required: true,
  },
  studentPhone : {
    type: String,
    required: true,
    trim: true,
  },

  //Educational details
  degree: {
    type: String,
    trim: true,
    //required: true,
  },
  branch: {
    type: String,
    trim: true,
    //required: true,
  },
  graduationYear: {
    type: Number,
    //required: true,
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

const Student = mongoose.model("Student", studentSchema); 
export default Student ;