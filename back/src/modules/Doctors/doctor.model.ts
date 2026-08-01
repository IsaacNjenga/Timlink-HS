import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true, default: "" },
    lastName: { type: String, trim: true, default: "" },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: "OTHER",
      required: true,
    },
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
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hospital",
        },
      ],
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
