"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRouter = DoctorRouter;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const admin_middleware_1 = require("../../middleware/admin.middleware");
const doctor_controller_1 = require("./doctor.controller");
function DoctorRouter() {
    const router = (0, express_1.Router)();
    router.post("/create-doctor", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, doctor_controller_1.CreateDoctor);
    router.get("/get-doctors", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, doctor_controller_1.FetchDoctors);
    router.get("/get-doctor/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, doctor_controller_1.FetchDoctorById);
    router.put("/update-doctor/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, doctor_controller_1.UpdateDoctor);
    router.delete("/delete-doctor/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, doctor_controller_1.DeleteDoctor);
    return router;
}
//# sourceMappingURL=doctor.routes.js.map