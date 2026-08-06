"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceJobModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const externalClientSchema = new mongoose_1.default.Schema({
    organization
}, { _id: false });
const ServiceJobSchema = new mongoose_1.default.Schema({
    serviceType: { type: String, required: true },
    clientType: { type: String, required: true, enum: ["Patient", "External"] },
    patientDetails: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "patients",
    },
    externalClientDetails: externalClientSchema,
    facilityLocation: "Radiology Department - Wing A",
    serviceDate: "2026-07-08T09:00:00.000Z",
    equipment: {
        name: "Mobile X-ray Unit A",
        code: "MH-1234",
    },
    serviceCost: 4500.0,
    status: "Completed",
    notes: "",
}, {
    collection: "service-jobs",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.ServiceJobModel = mongoose_1.default.model("ServiceJob", ServiceJobSchema);
//# sourceMappingURL=service-job.moel.js.map