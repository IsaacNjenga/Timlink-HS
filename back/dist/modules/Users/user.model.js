"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
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
        enum: ["SUPER_ADMIN", "FINANCE", "CASE_MANAGER", "SERVICE_STAFF"],
        required: true,
        default: "SERVICE_STAFF",
    },
    isActivated: { type: Boolean, default: false },
    refreshToken: {
        type: String,
        default: null,
        select: false,
    },
}, {
    collection: "users",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActivated: 1 });
exports.UserModel = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map