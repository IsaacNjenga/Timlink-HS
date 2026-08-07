"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const case_model_1 = require("./case.model");
const caseCache = new node_cache_1.default({ stdTTL: 300 });
const invalidateCaseCache = () => {
    caseCache.flushAll();
};
const HOSPITAL_PROFILE_POPULATE = [
    {
        path: "hospital",
        select: "hospitalName code tier phone email emergencyExt location operationalCapacity insurancePanels status createdAt updatedAt",
    },
];
const PATIENT_PROFILE_POPULATE = [
    {
        path: "patient",
        select: "firstName lastName dateOfBirth gender phone email address medicalHistory insuranceInfo status createdAt updatedAt",
    },
];
const DOCTOR_PROFILE_POPULATE = [
    {
        path: "doctor",
        select: "firstName lastName specialization phone email status createdAt updatedAt",
    },
];
const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);
const assertCaseId = (caseId) => {
    if (!caseId) {
        throw new BadRequestError_1.BadRequestError("Case ID is required");
    }
};
const toCase = (caseData) => caseData;
const sanitizeCreateData = (data, requesterRole) => {
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError_1.BadRequestError("Create data is required");
    }
    const createData = { ...data };
    return createData;
};
const sanitizeUpdateData = (data, requesterRole) => {
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError_1.BadRequestError("Update data is required");
    }
    const updateData = { ...data };
    const restrictedFields = Object.keys(updateData).filter((field) => {
        if (BLOCKED_UPDATE_FIELDS.has(field)) {
            return true;
        }
        return requesterRole !== "SUPER_ADMIN" && ADMIN_ONLY_FIELDS.has(field);
    });
    if (restrictedFields.length > 0) {
        throw new BadRequestError_1.BadRequestError(`You cannot update these fields: ${restrictedFields.join(", ")}`);
    }
    return updateData;
};
class CaseService {
    static async createCase(data, 
    // requesterId: string,
    requesterRole) {
        const createData = sanitizeCreateData(data, requesterRole);
        const result = new case_model_1.CaseModel(createData);
        await result.save();
        invalidateCaseCache();
        return toCase(result);
    }
    static async fetchCases(req) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const cacheKey = `case_page_${page}_limit_${limit}`;
        const cachedData = caseCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const [cases, totalCases] = (await Promise.all([
            case_model_1.CaseModel.find()
                .skip(skip)
                .limit(limit)
                .populate(HOSPITAL_PROFILE_POPULATE)
                .populate(PATIENT_PROFILE_POPULATE)
                .populate(DOCTOR_PROFILE_POPULATE)
                .lean()
                .sort({ createdAt: -1 }),
            case_model_1.CaseModel.countDocuments(),
        ]));
        if (!cases) {
            throw new BadRequestError_1.BadRequestError("cases not found!");
        }
        const responseData = {
            cases: cases,
            totalCases: totalCases,
            currentPage: page,
            totalPages: Math.ceil(totalCases / limit),
        };
        //cache response
        caseCache.set(cacheKey, responseData);
        return responseData;
    }
    static async fetchCaseById(caseId, requesterId, requesterRole) {
        assertCaseId(caseId);
        const caseData = await case_model_1.CaseModel.findById(caseId)
            .populate(HOSPITAL_PROFILE_POPULATE)
            .populate(PATIENT_PROFILE_POPULATE)
            .populate(DOCTOR_PROFILE_POPULATE)
            .lean();
        if (!caseData) {
            throw new BadRequestError_1.BadRequestError("Case not found!");
        }
        return toCase(caseData);
    }
    static async updateCase(caseId, data, requesterID, requesterRole) {
        assertCaseId(caseId);
        const updateData = sanitizeUpdateData(data, requesterRole);
        const caseData = await case_model_1.CaseModel.findByIdAndUpdate(caseId, updateData, {
            new: true,
            runValidators: true,
        })
            .populate(HOSPITAL_PROFILE_POPULATE)
            .populate(PATIENT_PROFILE_POPULATE)
            .populate(DOCTOR_PROFILE_POPULATE)
            .lean();
        if (!caseData) {
            throw new BadRequestError_1.BadRequestError("Case not found!");
        }
        invalidateCaseCache();
        return toCase(caseData);
    }
    static async deleteCase(caseId, requesterId, requesterRole) {
        assertCaseId(caseId);
        const caseData = await case_model_1.CaseModel.findByIdAndDelete(caseId).lean();
        if (!caseData) {
            throw new BadRequestError_1.BadRequestError("Case not found!");
        }
        invalidateCaseCache();
        return toCase(caseData);
    }
}
exports.CaseService = CaseService;
//# sourceMappingURL=case.service.js.map