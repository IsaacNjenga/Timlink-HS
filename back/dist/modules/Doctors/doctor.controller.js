"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDoctor = exports.UpdateDoctor = exports.FetchDoctorById = exports.FetchDoctors = exports.CreateDoctor = void 0;
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const catchAsync_1 = require("../../common/utils/catchAsync");
const doctor_service_1 = require("./doctor.service");
const Logs_1 = require("../Logs");
const getDoctorIdParam = (id) => {
    if (!id) {
        throw new BadRequestError_1.BadRequestError("Doctor ID is required!");
    }
    return Array.isArray(id) ? id[0] : id;
};
//to-do: make the code
exports.CreateDoctor = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const doctorData = await doctor_service_1.DoctorService.createDoctor(req.body, req.user.role);
    if (doctorData) {
        await (0, Logs_1.createLog)({
            type: "doctor",
            refId: doctorData._id.toString(),
            action: "created",
            title: "New doctor created",
            description: `Doctor: ${doctorData.firstName} with ID ${doctorData._id} was created`,
            refModel: "doctor",
            actor: req.user?._id,
        });
    }
    res.status(201).json({
        success: true,
        data: doctorData,
        message: "Doctor information has been created successfully",
    });
});
exports.FetchDoctors = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const doctorsData = await doctor_service_1.DoctorService.fetchDoctors(req);
    if (doctorsData && req.user?._id) {
        await (0, Logs_1.createLog)({
            type: "doctor",
            refId: req.user._id.toString(),
            action: "fetched",
            title: "Doctors fetched",
            description: `Doctor list was fetched`,
            refModel: "doctor",
            actor: req.user?._id,
        });
    }
    res.status(200).json({
        success: true,
        data: doctorsData,
        message: "Doctors fetched successfully",
    });
});
exports.FetchDoctorById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getDoctorIdParam(req.params.id);
    const doctor = await doctor_service_1.DoctorService.fetchDoctorById(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "doctor",
        refId: id,
        action: "received",
        title: "Doctor profile retrieved",
        description: `Fetched profile for Doctor ${id}`,
        refModel: "doctor",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: doctor,
        message: "Doctor retrieved successfully",
    });
});
exports.UpdateDoctor = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getDoctorIdParam(req.params.id);
    const doctor = await doctor_service_1.DoctorService.updateDoctor(id, req.body, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "doctor",
        refId: id,
        action: "updated",
        title: "Doctor updated",
        description: `Updated profile for Doctor ${id}`,
        refModel: "doctor",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: doctor,
        message: "Doctor updated successfully",
    });
});
exports.DeleteDoctor = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getDoctorIdParam(req.params.id);
    const doctor = await doctor_service_1.DoctorService.deleteDoctor(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "doctor",
        refId: id,
        action: "deleted",
        title: "Doctor deleted",
        description: `Deleted Doctor ${id}`,
        refModel: "doctor",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: doctor,
        message: "Doctor deleted successfully",
    });
});
//# sourceMappingURL=doctor.controller.js.map