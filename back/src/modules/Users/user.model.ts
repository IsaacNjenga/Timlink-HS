import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, trim: true, default: "" },
    lastname: { type: String, trim: true, default: "" },

    username: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    phonenumber: {
      type: String,
      trim: true,
      default: "",
    },

    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"],
      default: "PREFER_NOT_TO_SAY",
    },

    dateOfBirth: { type: Date, default: null },

    avatar: { type: String, default: null },
    bio: { type: String, default: "" },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "FINANCE", "CASE_MANAGER", "SERVICE STAFF"],
      required: true,
      default: "THRIFTEE",
    },
    
    isActivated: { type: Boolean, default: false },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ accountStatus: 1 });

export const UserModel = mongoose.model("User", UserSchema);
