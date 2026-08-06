"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const InventorySchema = new mongoose_1.default.Schema({
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
}, {
    collection: "inventory",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.InventoryModel = mongoose_1.default.model("Inventory", InventorySchema);
//# sourceMappingURL=inventory.model.js.map