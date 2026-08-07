"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseRouter = CaseRouter;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const admin_middleware_1 = require("../../middleware/admin.middleware");
const case_controller_1 = require("./case.controller");
function CaseRouter() {
    const router = (0, express_1.Router)();
    router.post("/create-case", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, case_controller_1.CreateCase);
    router.get("/get-cases", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, case_controller_1.FetchCases);
    router.get("/get-case/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, case_controller_1.FetchCaseById);
    router.put("/update-case/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, case_controller_1.UpdateCase);
    router.delete("/delete-case/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, case_controller_1.DeleteCase);
    return router;
}
//# sourceMappingURL=case.routes.js.map