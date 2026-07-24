"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const NextOfKinSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    relation: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    email: { type: String, required: false, trim: true },
}, { _id: false });
const PatientSchema = new mongoose_1.default.Schema({
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
    nextOfKin: {
        type: [NextOfKinSchema],
        required: true,
        validate: [
            (val) => val.length > 0,
            "At least one next of kin is required",
        ],
    },
    referralType: {
        type: String,
        enum: ["walk-in", "referral doctor", "website", "other", "social media"],
    },
    // referringDoctor:{type: } //ToDo: reference a doctor
    diagnosis: { type: String, required: true },
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
    notes: { type: String, default: null, required: true },
    dateOfRegistration: { type: Date, default: null },
}, {
    collection: "patients",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
PatientSchema.index({ email: 1 });
exports.PatientModel = mongoose_1.default.model("Patient", PatientSchema);
//# sourceMappingURL=patient.model.js.map