import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    equipmentName: { type: String, required: true },
    category: { type: String, required: true },
    serialModel: { type: String, unique: true, required: false },
    vehiclePlate: { type: String, unique: true, required: false },
    location: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: ["Available", "In Service", "Maintenance"],
    },
    rate: { type: Number, required: true },
    notes: { type: String, required: false },
  },
  {
    collection: "inventory",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export const InventoryModel = mongoose.model("Inventory", InventorySchema);
