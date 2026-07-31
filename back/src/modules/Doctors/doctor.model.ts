import mongoose from "mongoose";

const partnerHospitalsSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hospital",
    },
  },
  { _id: false },
);

const DoctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },
    specialty: { type: String, trim: true, required: true },

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

    agreedFeePercent: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      required: true,
    },
    //to-do: see how i can save totalRevenue
    // totalRevenue: 50000,
    partnerHospitals: {
      type: [partnerHospitalsSchema],
      required: true,
      validate: [
        (val: any) => val.length > 0,
        "At least one partner hospital is required",
      ],
    },
  },
  {
    collection: "doctors",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const DoctorModel = mongoose.model("Doctor", DoctorSchema);
