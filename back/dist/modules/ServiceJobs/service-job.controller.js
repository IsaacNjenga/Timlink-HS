"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteServiceJob = exports.UpdateServiceJob = exports.FetchServiceJobById = exports.FetchAllServiceJobs = exports.CreateServiceJob = void 0;
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const catchAsync_1 = require("../../common/utils/catchAsync");
const service_job_service_1 = require("./service-job.service");
const Logs_1 = require("../Logs");
const getServiceJobIdParam = (id) => {
    if (!id) {
        throw new BadRequestError_1.BadRequestError("Service Job ID is required!");
    }
    return Array.isArray(id) ? id[0] : id;
};
//to-do: make the code
exports.CreateServiceJob = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const serviceJobData = await service_job_service_1.ServiceJobService.createServiceJob(req.body, req.user.role);
    if (serviceJobData) {
        await (0, Logs_1.createLog)({
            type: "ServiceJob",
            refId: serviceJobData._id.toString(),
            action: "created",
            title: "New Service Job created",
            description: `Service Job: ${serviceJobData?.serviceType} at location: ${serviceJobData?.facilityLocation} was created`,
            refModel: "service-job",
            actor: req.user?._id,
        });
    }
    res.status(201).json({
        success: true,
        data: serviceJobData,
        message: "Service job has been created successfully",
    });
});
exports.FetchAllServiceJobs = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const serviceJobData = await service_job_service_1.ServiceJobService.fetchServiceJobs(req);
    if (serviceJobData && req.user?._id) {
        await (0, Logs_1.createLog)({
            type: "serviceJob",
            refId: req.user._id.toString(),
            action: "fetched",
            title: "All Service Jobs fetched",
            description: `Service Jobs list was fetched`,
            refModel: "service-job",
            actor: req.user?._id,
        });
    }
    res.status(200).json({
        success: true,
        data: serviceJobData,
        message: "All Service Jobs fetched successfully",
    });
});
exports.FetchServiceJobById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getServiceJobIdParam(req.params.id);
    const serviceJob = await service_job_service_1.ServiceJobService.fetchServiceJobById(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "serviceJob",
        refId: id,
        action: "received",
        title: "Service Job retrieved",
        description: `Fetched Service Job: ${id}`,
        refModel: "service-job",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: serviceJob,
        message: "Service Job item retrieved successfully",
    });
});
exports.UpdateServiceJob = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getServiceJobIdParam(req.params.id);
    const serviceJob = await service_job_service_1.ServiceJobService.updateServiceJob(id, req.body, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "serviceJob",
        refId: id,
        action: "updated",
        title: "Service Job updated",
        description: `Updated Service Job: ${id}`,
        refModel: "service-job",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: serviceJob,
        message: "Service Job item updated successfully",
    });
});
exports.DeleteServiceJob = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getServiceJobIdParam(req.params.id);
    await service_job_service_1.ServiceJobService.deleteServiceJob(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "serviceJob",
        refId: id,
        action: "deleted",
        title: "Service Job deleted",
        description: `Deleted Service Job: ${id}`,
        refModel: "service-job",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        message: "Service Job deleted successfully",
    });
});
//# sourceMappingURL=service-job.controller.js.map