"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const inventory_model_1 = require("./inventory.model");
const inventoryCache = new node_cache_1.default({ stdTTL: 300 });
const invalidateInventoryCache = () => {
    inventoryCache.flushAll();
};
const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);
const assertInventoryId = (inventoryId) => {
    if (!inventoryId) {
        throw new BadRequestError_1.BadRequestError("Inventory ID is required");
    }
};
const toInventory = (inventory) => inventory;
const sanitizeCreateData = (data, requesterRole) => {
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError_1.BadRequestError("Create data is required");
    }
    const createData = { ...data };
    return createData;
};
const sanitizeUpdateData = (data, requesterRole) => {
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError_1.BadRequestError("Update data is required");
    }
    const updateData = { ...data };
    const restrictedFields = Object.keys(updateData).filter((field) => {
        if (BLOCKED_UPDATE_FIELDS.has(field)) {
            return true;
        }
        return requesterRole !== "SUPER_ADMIN" && ADMIN_ONLY_FIELDS.has(field);
    });
    if (restrictedFields.length > 0) {
        throw new BadRequestError_1.BadRequestError(`You cannot update these fields: ${restrictedFields.join(", ")}`);
    }
    return updateData;
};
class InventoryService {
    static async createInventory(data, 
    // requesterId: string,
    requesterRole) {
        const createData = sanitizeCreateData(data, requesterRole);
        const result = new inventory_model_1.InventoryModel(createData);
        await result.save();
        const savedInventory = await inventory_model_1.InventoryModel.findById(result._id).lean();
        invalidateInventoryCache();
        return toInventory(savedInventory ?? result);
    }
    static async fetchInventories(req) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const cacheKey = `Inventory_page_${page}_limit_${limit}`;
        const cachedData = inventoryCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const [inventories, totalInventories] = (await Promise.all([
            inventory_model_1.InventoryModel.find()
                .skip(skip)
                .limit(limit)
                .lean()
                .sort({ createdAt: -1 }),
            inventory_model_1.InventoryModel.countDocuments(),
        ]));
        if (!inventories) {
            throw new BadRequestError_1.BadRequestError("Inventory not found!");
        }
        const responseData = {
            inventory: inventories,
            totalInventory: totalInventories,
            currentPage: page,
            totalPages: Math.ceil(totalInventories / limit),
        };
        //cache response
        inventoryCache.set(cacheKey, responseData);
        // return Inventory.map(toInventory);
        return responseData;
    }
    static async fetchInventoryById(inventoryId, requesterId, requesterRole) {
        assertInventoryId(inventoryId);
        const inventory = await inventory_model_1.InventoryModel.findById(inventoryId).lean();
        if (!inventory) {
            throw new BadRequestError_1.BadRequestError("Inventory not found!");
        }
        return toInventory(inventory);
    }
    static async updateInventory(inventoryId, data, requesterID, requesterRole) {
        assertInventoryId(inventoryId);
        const updateData = sanitizeUpdateData(data, requesterRole);
        const inventory = await inventory_model_1.InventoryModel.findByIdAndUpdate(inventoryId, updateData, {
            new: true,
            runValidators: true,
        }).lean();
        if (!inventory) {
            throw new BadRequestError_1.BadRequestError("Inventory not found!");
        }
        invalidateInventoryCache();
        return toInventory(inventory);
    }
    static async deleteInventory(inventoryId, requesterId, requesterRole) {
        assertInventoryId(inventoryId);
        const inventory = await inventory_model_1.InventoryModel.findByIdAndDelete(inventoryId).lean();
        if (!inventory) {
            throw new BadRequestError_1.BadRequestError("Inventory not found!");
        }
        invalidateInventoryCache();
        return toInventory(inventory);
    }
}
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map