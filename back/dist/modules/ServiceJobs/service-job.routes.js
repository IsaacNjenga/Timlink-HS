"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceJobRouter = ServiceJobRouter;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const admin_middleware_1 = require("../../middleware/admin.middleware");
const service_job_controller_1 = require("./service-job.controller");
function ServiceJobRouter() {
    const router = (0, express_1.Router)();
    router.post("/create-service-job", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, service_job_controller_1.CreateServiceJob);
    router.get("/get-service-jobs", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, service_job_controller_1.FetchAllServiceJobs);
    router.get("/get-service-job/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, service_job_controller_1.FetchServiceJobById);
    router.put("/update-service-job/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, service_job_controller_1.UpdateServiceJob);
    router.delete("/delete-service-job/:id", auth_middleware_1.protectRoute, admin_middleware_1.adminRoute, service_job_controller_1.DeleteServiceJob);
    return router;
}
//# sourceMappingURL=service-job.routes.js.map