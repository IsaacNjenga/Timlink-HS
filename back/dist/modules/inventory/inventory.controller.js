"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteInventory = exports.UpdateInventory = exports.FetchInventoryById = exports.FetchAllInventory = exports.CreateInventory = void 0;
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const catchAsync_1 = require("../../common/utils/catchAsync");
const inventory_service_1 = require("./inventory.service");
const Logs_1 = require("../Logs");
const getInventoryIdParam = (id) => {
    if (!id) {
        throw new BadRequestError_1.BadRequestError("Inventory ID is required!");
    }
    return Array.isArray(id) ? id[0] : id;
};
//to-do: make the code
exports.CreateInventory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const inventoryData = await inventory_service_1.InventoryService.createInventory(req.body, req.user.role);
    if (inventoryData) {
        await (0, Logs_1.createLog)({
            type: "inventory",
            refId: inventoryData._id.toString(),
            action: "created",
            title: "New Inventory item created",
            description: `Inventory: ${inventoryData?.equipmentName} category: ${inventoryData?.category} was created`,
            refModel: "inventory",
            actor: req.user?._id,
        });
    }
    res.status(201).json({
        success: true,
        data: inventoryData,
        message: "Inventory item has been created successfully",
    });
});
exports.FetchAllInventory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const inventoryData = await inventory_service_1.InventoryService.fetchInventories(req);
    if (inventoryData && req.user?._id) {
        await (0, Logs_1.createLog)({
            type: "inventory",
            refId: req.user._id.toString(),
            action: "fetched",
            title: "All Inventory fetched",
            description: `Inventory list was fetched`,
            refModel: "inventory",
            actor: req.user?._id,
        });
    }
    res.status(200).json({
        success: true,
        data: inventoryData,
        message: "All Inventory fetched successfully",
    });
});
exports.FetchInventoryById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getInventoryIdParam(req.params.id);
    const inventory = await inventory_service_1.InventoryService.fetchInventoryById(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "inventory",
        refId: id,
        action: "received",
        title: "Inventory item retrieved",
        description: `Fetched Inventory item: ${id}`,
        refModel: "inventory",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: inventory,
        message: "Inventory item retrieved successfully",
    });
});
exports.UpdateInventory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getInventoryIdParam(req.params.id);
    const inventory = await inventory_service_1.InventoryService.updateInventory(id, req.body, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "inventory",
        refId: id,
        action: "updated",
        title: "Inventory item updated",
        description: `Updated Inventory item: ${id}`,
        refModel: "inventory",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: inventory,
        message: "Inventory item updated successfully",
    });
});
exports.DeleteInventory = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getInventoryIdParam(req.params.id);
    await inventory_service_1.InventoryService.deleteInventory(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "inventory",
        refId: id,
        action: "deleted",
        title: "Inventory item deleted",
        description: `Deleted Inventory item: ${id}`,
        refModel: "inventory",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        message: "Inventory deleted successfully",
    });
});
//# sourceMappingURL=inventory.controller.js.map