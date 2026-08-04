"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const financialsSchema = new mongoose_1.default.Schema({
    estimatedCostKsh: { type: Number, required: true },
    finalBilledKsh: { type: Number, required: false },
    amountReceivedKsh: { type: Number, required: false },
    invoiceNo: { type: String, required: false },
}, { _id: false });
const CaseSchema = new mongoose_1.default.Schema({
    patient: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    surgeryType: { type: String, required: true, trim: true },
    doctor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    hospital: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true,
    },
    surgeryDate: { type: Date, required: true },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Partially Paid"],
        default: "Pending",
        required: true,
    },
    paymentMode: { type: String, required: true },
    financials: financialsSchema,
    commissionFees: {
        agencyFeePercent: { type: Number, required: true },
        surgeonFeePercent: { type: Number, required: true },
        refereeAdminFeePercent: { type: Number, required: true },
    },
    notes: { type: String, required: false },
}, {
    collection: "cases",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.CaseModel = mongoose_1.default.model("Case", CaseSchema);
//# sourceMappingURL=case.model.js.map