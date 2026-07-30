"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const hospital_model_1 = require("./hospital.model");
const hospitalCache = new node_cache_1.default({ stdTTL: 300 });
const invalidateHospitalCache = () => {
    hospitalCache.flushAll();
};
const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);
const assertHospitalId = (hospitalId) => {
    if (!hospitalId) {
        throw new BadRequestError_1.BadRequestError("Hospital ID is required");
    }
};
const toHospital = (hospital) => hospital;
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
class HospitalService {
    static async createHospital(data, 
    // requesterId: string,
    requesterRole) {
        const createData = sanitizeCreateData(data, requesterRole);
        const result = new hospital_model_1.HospitalModel(createData);
        await result.save();
        invalidateHospitalCache();
        return toHospital(result);
    }
    static async fetchHospitals(req) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const cacheKey = `hospital_page_${page}_limit_${limit}`;
        const cachedData = hospitalCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const [hospitals, totalHospitals] = (await Promise.all([
            hospital_model_1.HospitalModel.find()
                .skip(skip)
                .limit(limit)
                .lean()
                .sort({ createdAt: -1 }),
            hospital_model_1.HospitalModel.countDocuments(),
        ]));
        if (!hospitals) {
            throw new BadRequestError_1.BadRequestError("Hospitals not found!");
        }
        const responseData = {
            hospitals: hospitals,
            totalHospitals: totalHospitals,
            currentPage: page,
            totalPages: Math.ceil(totalHospitals / limit),
        };
        //cache response
        hospitalCache.set(cacheKey, responseData);
        return responseData;
    }
    static async fetchHospitalById(hospitalId, requesterId, requesterRole) {
        assertHospitalId(hospitalId);
        const hospital = await hospital_model_1.HospitalModel.findById(hospitalId).lean();
        if (!hospital) {
            throw new BadRequestError_1.BadRequestError("Hospital not found!");
        }
        return toHospital(hospital);
    }
    static async updateHospital(hospitalId, data, requesterID, requesterRole) {
        assertHospitalId(hospitalId);
        const updateData = sanitizeUpdateData(data, requesterRole);
        const hospital = await hospital_model_1.HospitalModel.findByIdAndUpdate(hospitalId, updateData, {
            new: true,
            runValidators: true,
        }).lean();
        if (!hospital) {
            throw new BadRequestError_1.BadRequestError("Hospital not found!");
        }
        invalidateHospitalCache();
        return toHospital(hospital);
    }
    static async deleteHospital(hospitalId, requesterId, requesterRole) {
        assertHospitalId(hospitalId);
        const hospital = await hospital_model_1.HospitalModel.findByIdAndDelete(hospitalId).lean();
        if (!hospital) {
            throw new BadRequestError_1.BadRequestError("Hospital not found!");
        }
        invalidateHospitalCache();
        return toHospital(hospital);
    }
}
exports.HospitalService = HospitalService;
//# sourceMappingURL=hospital.service.js.map