import mongoose from "mongoose";

const externalPatientSchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true },
    referralRef: { type: String, required: true },
    walkInName: { type: String, required: true },
  },
  { _id: false },
);

const ServiceJobSchema = new mongoose.Schema(
  {
    serviceType: { type: String, required: true },
    clientType: { type: String, required: true, enum: ["Patient", "External"] },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients",
      required: function () {
        return this.clientType === "Patient";
      },
    },
    externalPatient: externalPatientSchema,
    facilityLocation: { type: String, required: true },
    serviceDate: { type: Date, required: true },
    equipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inventory",
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
  },
  {
    collection: "service-jobs",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const ServiceJobModel = mongoose.model("ServiceJob", ServiceJobSchema);
