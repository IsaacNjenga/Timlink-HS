"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCase = exports.UpdateCase = exports.FetchCaseById = exports.FetchCases = exports.CreateCase = void 0;
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const catchAsync_1 = require("../../common/utils/catchAsync");
const case_service_1 = require("./case.service");
const Logs_1 = require("../Logs");
const getcaseIdParam = (id) => {
    if (!id) {
        throw new BadRequestError_1.BadRequestError("case ID is required!");
    }
    return Array.isArray(id) ? id[0] : id;
};
exports.CreateCase = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const caseData = await case_service_1.CaseService.createCase(req.body, req.user.role);
    if (caseData) {
        await (0, Logs_1.createLog)({
            type: "case",
            refId: caseData._id.toString(),
            action: "created",
            title: "New case created",
            description: `case: ${caseData._id.toString()} was created`,
            refModel: "case",
            actor: req.user?._id,
        });
    }
    res.status(201).json({
        success: true,
        data: caseData,
        message: "Case information has been created successfully",
    });
});
exports.FetchCases = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const casesData = await case_service_1.CaseService.fetchCases(req);
    if (casesData && req.user?._id) {
        await (0, Logs_1.createLog)({
            type: "case",
            refId: req.user._id.toString(),
            action: "fetched",
            title: "Cases fetched",
            description: `Case list was fetched`,
            refModel: "case",
            actor: req.user?._id,
        });
    }
    res.status(200).json({
        success: true,
        data: casesData,
        message: "Cases fetched successfully",
    });
});
exports.FetchCaseById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getcaseIdParam(req.params.id);
    const caseData = await case_service_1.CaseService.fetchCaseById(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "case",
        refId: id,
        action: "received",
        title: "Case info retrieved",
        description: `Fetched information for case ${id}`,
        refModel: "case",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: caseData,
        message: "Case retrieved successfully",
    });
});
exports.UpdateCase = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getcaseIdParam(req.params.id);
    const caseData = await case_service_1.CaseService.updateCase(id, req.body, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "case",
        refId: id,
        action: "updated",
        title: "Case updated",
        description: `Updated case ${id}`,
        refModel: "case",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: caseData,
        message: "Case updated successfully",
    });
});
exports.DeleteCase = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const id = getcaseIdParam(req.params.id);
    const caseData = await case_service_1.CaseService.deleteCase(id, req.user._id.toString(), req.user.role);
    await (0, Logs_1.createLog)({
        type: "case",
        refId: id,
        action: "deleted",
        title: "Case deleted",
        description: `Deleted case ${id}`,
        refModel: "case",
        actor: req.user?._id,
    });
    res.status(200).json({
        success: true,
        data: caseData,
        message: "Case deleted successfully",
    });
});
//# sourceMappingURL=case.controller.js.map