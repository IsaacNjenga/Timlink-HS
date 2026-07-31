"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const locationSchema = new mongoose_1.default.Schema({
    address: { type: String, trim: true },
    city: { type: String, trim: true },
}, { _id: false });
const operationalSchema = new mongoose_1.default.Schema({
    totalBeds: { type: String, trim: true },
    icuBeds: { type: String, trim: true },
    theatres: { type: String, trim: true },
}, { _id: false });
const HospitalSchema = new mongoose_1.default.Schema({
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
        type: locationSchema,
    },
    operationalCapacity: {
        type: operationalSchema,
        required: false,
    },
    insurancePanels: { type: [String], required: false },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
    },
}, {
    collection: "hospitals",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.HospitalModel = mongoose_1.default.model("Hospital", HospitalSchema);
//# sourceMappingURL=hospital.model.js.map