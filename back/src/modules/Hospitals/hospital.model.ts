import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    address: { type: String, trim: true },
    city: { type: String, trim: true },
  },
  { _id: false },
);

const operationalSchema = new mongoose.Schema(
  {
    totalBeds: { type: String, trim: true },
    icuBeds: { type: String, trim: true },
    theatres: { type: String, trim: true },
  },
  { _id: false },
);

const HospitalSchema = new mongoose.Schema(
  {
    hospitalName: { type: String, required: true },
    code: { type: String, required: true },
    tier: { type: String, required: true },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    emergencyExt: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: { locationSchema },
      validate: [(val: any) => val.length > 0, "Location is required"],
    },

    operationalCapacity: {
      type: [operationalSchema],
      required: false,
    },

    insurancePanels: { type: [String], required: false },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },
  },
  {
    collection: "hospitals",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const HospitalModel = mongoose.model("Hospital", HospitalSchema);
