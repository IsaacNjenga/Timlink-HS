import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },

    dateOfBirth: { type: Date, default: null },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: "OTHER",
    },

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

    address: { type: String, required: false, default: "" },

    nextOfKin: { type: [{ String }], required: true },

    referralType: {
      type: String,
      enum: ["walk-in", "referral doctor", "website", "other"],
    },

    // referringDoctor:{type: } //ToDo: reference a doctor

    diagnosis: { type: String, default: null },

    paymentMode: { type: String }, //enum for insurance, cash, debit etc

    status: {
      type: String,
      enum: [
        "New Lead",
        "Under Review",
        "Matched",
        "Scheduled",
        "Completed",
        "Closed",
      ],
    },

    notes: { type: String, default: null },
    dateOfRegistration: { type: Date, default: null },
  },
  {
    collection: "patients",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

PatientSchema.index({ email: 1 });

export const PatientModel = mongoose.model("Patient", PatientSchema);
