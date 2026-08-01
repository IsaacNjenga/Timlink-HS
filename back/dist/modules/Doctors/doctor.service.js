"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const doctor_model_1 = require("./doctor.model");
const doctorCache = new node_cache_1.default({ stdTTL: 300 });
const invalidateDoctorCache = () => {
    doctorCache.flushAll();
};
const HOSPITAL_PROFILE_POPULATE = [
    {
        path: "partnerHospitals",
        select: "hospitalName code tier phone email emergencyExt location operationalCapacity insurancePanels status createdAt updatedAt",
    },
];
const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);
const assertDoctorId = (doctorId) => {
    if (!doctorId) {
        throw new BadRequestError_1.BadRequestError("Doctor ID is required");
    }
};
const toDoctor = (doctor) => doctor;
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
class DoctorService {
    static async createDoctor(data, 
    // requesterId: string,
    requesterRole) {
        const createData = sanitizeCreateData(data, requesterRole);
        const result = new doctor_model_1.DoctorModel(createData);
        await result.save();
        invalidateDoctorCache();
        return toDoctor(result);
    }
    static async fetchDoctors(req) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const cacheKey = `doctor_page_${page}_limit_${limit}`;
        const cachedData = doctorCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const [doctors, totalDoctors] = (await Promise.all([
            doctor_model_1.DoctorModel.find()
                .skip(skip)
                .limit(limit)
                .populate(HOSPITAL_PROFILE_POPULATE)
                .lean()
                .sort({ createdAt: -1 }),
            doctor_model_1.DoctorModel.countDocuments(),
        ]));
        if (!doctors) {
            throw new BadRequestError_1.BadRequestError("Doctors not found!");
        }
        const responseData = {
            doctors: doctors,
            totalDoctors: totalDoctors,
            currentPage: page,
            totalPages: Math.ceil(totalDoctors / limit),
        };
        //cache response
        doctorCache.set(cacheKey, responseData);
        return responseData;
    }
    static async fetchDoctorById(doctorId, requesterId, requesterRole) {
        assertDoctorId(doctorId);
        const doctor = await doctor_model_1.DoctorModel.findById(doctorId)
            .populate(HOSPITAL_PROFILE_POPULATE)
            .lean();
        if (!doctor) {
            throw new BadRequestError_1.BadRequestError("Doctor not found!");
        }
        return toDoctor(doctor);
    }
    static async updateDoctor(doctorId, data, requesterID, requesterRole) {
        assertDoctorId(doctorId);
        const updateData = sanitizeUpdateData(data, requesterRole);
        const doctor = await doctor_model_1.DoctorModel.findByIdAndUpdate(doctorId, updateData, {
            new: true,
            runValidators: true,
        }).lean();
        if (!doctor) {
            throw new BadRequestError_1.BadRequestError("Doctor not found!");
        }
        invalidateDoctorCache();
        return toDoctor(doctor);
    }
    static async deleteDoctor(doctorId, requesterId, requesterRole) {
        assertDoctorId(doctorId);
        const doctor = await doctor_model_1.DoctorModel.findByIdAndDelete(doctorId).lean();
        if (!doctor) {
            throw new BadRequestError_1.BadRequestError("Doctor not found!");
        }
        invalidateDoctorCache();
        return toDoctor(doctor);
    }
}
exports.DoctorService = DoctorService;
//# sourceMappingURL=doctor.service.js.map