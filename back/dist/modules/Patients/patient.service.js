"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const user_model_1 = require("../Users/user.model");
const patient_model_1 = require("./patient.model");
const patientCache = new node_cache_1.default({ stdTTL: 300 });
// const DOCTOR_PROFILE_POPULATE = [
//   {
//     path: "profile",
//     populate: { path: "role" },
//   },
// ];
const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);
const assertPatientId = (patientId) => {
    if (!patientId) {
        throw new BadRequestError_1.BadRequestError("Patient ID is required");
    }
};
const toPatient = (patient) => patient;
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
class PatientService {
    static async createPatient(data, 
    // requesterId: string,
    requesterRole) {
        const createData = sanitizeCreateData(data, requesterRole);
        const result = new patient_model_1.PatientModel(createData);
        await result.save();
        return toPatient(result);
    }
    static async fetchPatients(req) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const cacheKey = `patient_page_${page}_limit_${limit}`;
        const cachedData = patientCache.get(cacheKey);
        if (cachedData) {
            return { patients: cachedData };
        }
        const [patients, totalPatients] = (await Promise.all([
            patient_model_1.PatientModel.find()
                .skip(skip)
                .limit(limit)
                // .populate(DOCTOR_PROFILE_POPULATE)
                .lean()
                .sort({ createdAt: -1 }),
            patient_model_1.PatientModel.countDocuments(),
        ]));
        if (!patients) {
            throw new BadRequestError_1.BadRequestError("Patients not found!");
        }
        const responseData = {
            patients: patients,
            totalPatients: totalPatients,
            currentPage: page,
            totalPages: Math.ceil(totalPatients / limit),
        };
        //cache response
        patientCache.set(cacheKey, responseData);
        // return patient.map(toPatient);
        return responseData;
    }
    static async fetchPatientById(patientId, requesterId, requesterRole) {
        assertPatientId(patientId);
        const patient = await patient_model_1.PatientModel.findById(patientId)
            // .populate(DOCTOR_PROFILE_POPULATE)
            .lean();
        if (!patient) {
            throw new BadRequestError_1.BadRequestError("Patient not found!");
        }
        return toPatient(patient);
    }
    static async updatePatient(patientId, data, requesterID, requesterRole) {
        assertPatientId(patientId);
        const updateData = sanitizeUpdateData(data, requesterRole);
        const patient = await user_model_1.UserModel.findByIdAndUpdate(patientId, updateData, {
            new: true,
            runValidators: true,
        })
            // .populate(DOCTOR_PROFILE_POPULATE)
            .lean();
        if (!patient) {
            throw new BadRequestError_1.BadRequestError("Patient not found!");
        }
        return toPatient(patient);
    }
    static async deletePatient(patientId, requesterId, requesterRole) {
        assertPatientId(patientId);
        const patient = await patient_model_1.PatientModel.findByIdAndDelete(patientId).lean();
        if (!patient) {
            throw new BadRequestError_1.BadRequestError("Patient not found!");
        }
        return toPatient(patient);
    }
}
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map