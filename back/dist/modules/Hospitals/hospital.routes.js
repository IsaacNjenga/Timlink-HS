"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalRouter = HospitalRouter;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const admin_middleware_1 = require("../../middleware/admin.middleware");
const hospital_controller_1 = require("./hospital.controller");
function HospitalRouter() {
    const router = (0, express_1.Router)();
    router.post("/create-hospital", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, hospital_controller_1.CreateHospital);
    router.get("/get-hospitals", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, hospital_controller_1.FetchHospitals);
    router.get("/get-hospital/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, hospital_controller_1.FetchHospitalById);
    router.put("/update-hospital/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, hospital_controller_1.UpdateHospital);
    router.delete("/delete-hospital/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, hospital_controller_1.DeleteHospital);
    return router;
}
//# sourceMappingURL=hospital.routes.js.map