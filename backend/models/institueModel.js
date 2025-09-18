import mongoose from "mongoose";
import { required } from "nodemon/lib/config";
import { home } from "nodemon/lib/utils";


const instituteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    shortName: {
      type: String,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
    },
    contactPhone: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
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

export default mongoose.model("Institute", instituteSchema);
