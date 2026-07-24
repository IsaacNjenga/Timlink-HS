"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePatient = exports.PatchPatient = exports.UpdatePatient = exports.FetchPatientById = exports.FetchPatients = exports.CreatePatient = void 0;
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const catchAsync_1 = require("../../common/utils/catchAsync");
const logs_service_1 = require("../Logs/logs.service");
const patient_service_1 = require("./patient.service");
const getPatientIdParam = (id) => {
    if (!id) {
        throw new BadRequestError_1.BadRequestError("Patient ID is required!");
    }
    return Array.isArray(id) ? id[0] : id;
};
exports.CreatePatient = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const patientData = await patient_service_1.PatientService.createPatient(req.body, req.user.role);
    if (patientData) {
        await (0, logs_service_1.createLog)({
            type: "patient",
            refId: patientData._id.toString(),
            action: "created",
            title: "New patient created",
            description: `Patient ${patientData.firstName} ${patientData.lastName} was created`,
            refModel: "patient",
        });
    }
    res.status(201).json({
        success: true,
        data: patientData,
        message: "Patient info created successfully",
    });
});
exports.FetchPatients = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const patientsData = await patient_service_1.PatientService.fetchPatients(req);
    if (patientsData && req.user?._id) {
        await (0, logs_service_1.createLog)({
            type: "patient",
            refId: req.user._id.toString(),
            action: "fetched",
            title: "Patients fetched",
            description: `Patient list was fetched by ${req.user._id.toString()}`,
            refModel: "patient",
        });
    }
    res.status(200).json({
        success: true,
        data: patientsData,
        message: "Patients fetched successfully",
    });
});
exports.FetchPatientById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getPatientIdParam(req.params.id);
    const patient = await patient_service_1.PatientService.fetchPatientById(id, req.user._id.toString(), req.user.role);
    await (0, logs_service_1.createLog)({
        type: "patient",
        refId: id,
        action: "received",
        title: "Patient profile retrieved",
        description: `Fetched profile for patient ${id}`,
        refModel: "patient",
    });
    res.status(200).json({
        success: true,
        data: patient,
        message: "Patient retrieved successfully",
    });
});
exports.UpdatePatient = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getPatientIdParam(req.params.id);
    const patient = await patient_service_1.PatientService.updatePatient(id, req.body, req.user._id.toString(), req.user.role);
    await (0, logs_service_1.createLog)({
        type: "patient",
        refId: id,
        action: "updated",
        title: "Patient updated",
        description: `Updated profile for patient ${id}`,
        refModel: "patient",
    });
    res.status(200).json({
        success: true,
        data: patient,
        message: "Patient updated successfully",
    });
});
exports.PatchPatient = exports.UpdatePatient;
exports.DeletePatient = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getPatientIdParam(req.params.id);
    const patient = await patient_service_1.PatientService.deletePatient(id, req.user._id.toString(), req.user.role);
    await (0, logs_service_1.createLog)({
        type: "patient",
        refId: id,
        action: "deleted",
        title: "Patient deleted",
        description: `Deleted patient ${id}`,
        refModel: "patient",
    });
    res.status(200).json({
        success: true,
        data: patient,
        message: "Patient deleted successfully",
    });
});
//# sourceMappingURL=patient.controller.js.map