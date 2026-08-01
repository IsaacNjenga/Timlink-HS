"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteHospital = exports.UpdateHospital = exports.FetchHospitalById = exports.FetchHospitals = exports.CreateHospital = void 0;
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const catchAsync_1 = require("../../common/utils/catchAsync");
const hospital_service_1 = require("./hospital.service");
const Logs_1 = require("../Logs");
const getHospitalIdParam = (id) => {
    if (!id) {
        throw new BadRequestError_1.BadRequestError("Hospital ID is required!");
    }
    return Array.isArray(id) ? id[0] : id;
};
//to-do: make the code
exports.CreateHospital = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const hospitalData = await hospital_service_1.HospitalService.createHospital(req.body, req.user.role);
    if (hospitalData) {
        await (0, Logs_1.createLog)({
            type: "hospital",
            refId: hospitalData._id.toString(),
            action: "created",
            title: "New hospital created",
            description: `Hospital: ${hospitalData.hospitalName} code: ${hospitalData.code} was created`,
            refModel: "hospital",
            actor: req.user?._id,
        });
    }
    res.status(201).json({
        success: true,
        data: hospitalData,
        message: "Hospital information has been created successfully",
    });
});
exports.FetchHospitals = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const hospitalsData = await hospital_service_1.HospitalService.fetchHospitals(req);
    if (hospitalsData && req.user?._id) {
        await (0, Logs_1.createLog)({
            type: "hospital",
            refId: req.user._id.toString(),
            action: "fetched",
            title: "Hospitals fetched",
            description: `Hospital list was fetched`,
            refModel: "hospital",
            actor: req.user?._id,
        });
    }
    res.status(200).json({
        success: true,
        data: hospitalsData,
        message: "Hospitals fetched successfully",
    });
});
exports.FetchHospitalById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getHospitalIdParam(req.params.id);
    const hospital = await hospital_service_1.HospitalService.fetchHospitalById(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "hospital",
        refId: id,
        action: "received",
        title: "Hospital profile retrieved",
        description: `Fetched profile for Hospital ${id}`,
        refModel: "hospital",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: hospital,
        message: "Hospital retrieved successfully",
    });
});
exports.UpdateHospital = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getHospitalIdParam(req.params.id);
    const hospital = await hospital_service_1.HospitalService.updateHospital(id, req.body, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "hospital",
        refId: id,
        action: "updated",
        title: "Hospital updated",
        description: `Updated profile for Hospital ${id}`,
        refModel: "hospital",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: hospital,
        message: "Hospital updated successfully",
    });
});
exports.DeleteHospital = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getHospitalIdParam(req.params.id);
    const hospital = await hospital_service_1.HospitalService.deleteHospital(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "hospital",
        refId: id,
        action: "deleted",
        title: "Hospital deleted",
        description: `Deleted Hospital ${id}`,
        refModel: "hospital",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: hospital,
        message: "Hospital deleted successfully",
    });
});
//# sourceMappingURL=hospital.controller.js.map