"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceJobModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const externalPatientSchema = new mongoose_1.default.Schema({
    organizationName: { type: String, required: true },
    referralRef: { type: String, required: true },
    walkInName: { type: String, required: true },
}, { _id: false });
const ServiceJobSchema = new mongoose_1.default.Schema({
    serviceType: { type: String, required: true },
    clientType: { type: String, required: true, enum: ["Patient", "External"] },
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: function () {
            return this.clientType === "Patient";
        },
    },
    externalPatient: externalPatientSchema,
    facilityLocation: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    equipment: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Inventory",
        required: function () {
            return this.clientType === "External";
        },
    },
    serviceCost: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        enum: ["Completed", "Scheduled", "Cancelled"],
    },
    notes: { type: String, required: false },
}, {
    collection: "service-jobs",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.ServiceJobModel = mongoose_1.default.model("ServiceJob", ServiceJobSchema);
//# sourceMappingURL=service-job.model.js.map