import mongoose from "mongoose";

const financialsSchema = new mongoose.Schema(
  {
    estimatedCostKsh: { type: Number, required: true },
    finalBilledKsh: { type: Number, required: false },
    amountReceivedKsh: { type: Number, required: false },
    invoiceNo: { type: String, required: false },
  },
  { _id: false },
);

const CaseSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    surgeryType: { type: String, required: true, trim: true },

    surgeon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    collection: "cases",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const CaseModel = mongoose.model("Case", CaseSchema);
