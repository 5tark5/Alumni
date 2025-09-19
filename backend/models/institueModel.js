const mongoose = require("mongoose");



const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    institutePassword : {
      type : String ,
      trim : true,
      required : true,
      minLength : 8,
    }, 
    address: {
      type: String,
      // required : true,
      trim: true,
    },
    city: {
      type: String,
      // required : true,
      trim: true,
    },
    state: {
      type: String,
      // required : true,
      trim: true,
    },
    country: {
      type: String,
      // required : true,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
      // required : true,
    },
    instituteEmail: {
      type: String,
      required : true,
      unique : true,
      trim: true,
    },
    institutePhone: {
      type: String,
      trim: true,
      required : true,
    },
    instituteLogo: {
      type: String,
      trim: true,
    },
    completeProfile :
    {
      type : Boolean,
      default : false ,
    },
    // Reference to the Alumni collection
    alumni: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumni",
      },
    ],
    // Admins for this specific institute
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Alumni",
      },
    ],
  },
  { timestamps: true }
);

const Institute = mongoose.model("Institute", instituteSchema);
module.exports = Institute;
