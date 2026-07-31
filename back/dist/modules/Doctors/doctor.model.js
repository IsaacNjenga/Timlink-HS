"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ;
const DoctorSchema = new mongoose_1.default.Schema({
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
    // totalRevenue: 50000,
    partnerHospitals: ["Nairobi Hospital", "MP Shah Hospital"],
}, {
    collection: "doctors",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.DoctorModel = mongoose_1.default.model("Doctor", DoctorSchema);
//# sourceMappingURL=doctor.model.js.map