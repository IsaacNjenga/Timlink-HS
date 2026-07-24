"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRouter = PatientRouter;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const admin_middleware_1 = require("../../middleware/admin.middleware");
const patient_controller_1 = require("./patient.controller");
function PatientRouter() {
    const router = (0, express_1.Router)();
    router.post("/create-patient", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, patient_controller_1.CreatePatient);
    router.get("/get-patients", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, patient_controller_1.FetchPatients);
    router.get("/get-patient/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, patient_controller_1.FetchPatientById);
    router.put("/update-patient/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, patient_controller_1.UpdatePatient);
    router.delete("/delete-patient/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, patient_controller_1.DeletePatient);
    return router;
}
//# sourceMappingURL=patient.routes.js.map