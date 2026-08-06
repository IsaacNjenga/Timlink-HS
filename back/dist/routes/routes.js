"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
exports.createRoutes = createRoutes;
const express_1 = require("express");
const Auth_1 = require("../modules/Auth");
const Users_1 = require("../modules/Users");
const patient_routes_1 = require("../modules/Patients/patient.routes");
const hospital_routes_1 = require("../modules/Hospitals/hospital.routes");
const doctor_routes_1 = require("../modules/Doctors/doctor.routes");
const case_routes_1 = require("../modules/Cases/case.routes");
const inventory_routes_1 = require("../modules/inventory/inventory.routes");
function createRoutes() {
    const router = (0, express_1.Router)();
    router.use("/auth", (0, Auth_1.AuthRouter)());
    router.use("/users", (0, Users_1.UserRouter)());
    router.use("/patients", (0, patient_routes_1.PatientRouter)());
    router.use("/hospitals", (0, hospital_routes_1.HospitalRouter)());
    router.use("/doctors", (0, doctor_routes_1.DoctorRouter)());
    router.use("/cases", (0, case_routes_1.CaseRouter)());
    router.use("/inventory", (0, inventory_routes_1.InventoryRouter)());
    return router;
}
exports.appRouter = createRoutes();
//# sourceMappingURL=routes.js.map