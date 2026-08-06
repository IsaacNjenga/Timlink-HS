"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRouter = InventoryRouter;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const admin_middleware_1 = require("../../middleware/admin.middleware");
const Inventory_controller_1 = require("./Inventory.controller");
function InventoryRouter() {
    const router = (0, express_1.Router)();
    router.post("/create-inventory", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, Inventory_controller_1.CreateInventory);
    router.get("/get-inventory", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, Inventory_controller_1.FetchAllInventory);
    router.get("/get-inventory/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, Inventory_controller_1.FetchInventoryById);
    router.put("/update-inventory/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, Inventory_controller_1.UpdateInventory);
    router.delete("/delete-Inventory/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, Inventory_controller_1.DeleteInventory);
    return router;
}
//# sourceMappingURL=inventory.routes.js.map