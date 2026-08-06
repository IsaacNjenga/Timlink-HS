"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceJobService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const BadRequestError_1 = require("../../common/errors/BadRequestError");
const service_job_model_1 = require("./service-job.model");
const serviceJobCache = new node_cache_1.default({ stdTTL: 300 });
const invalidateServiceJobCache = () => {
    serviceJobCache.flushAll();
};
const PATIENT_PROFILE_POPULATE = [
    {
        path: "patient",
        select: "firstName lastName dateOfBirth gender diagnosis phone email status address nextOfKin paymentMode referringDoctor referralType createdAt updatedAt",
    },
];
const INVENTORY_PROFILE_POPULATE = [
    {
        path: "equipment",
        select: "equipmentName category serialModel vehiclePlate location status rate notes createdAt updatedAt",
    },
];
const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);
const assertServiceJobId = (serviceJobId) => {
    if (!serviceJobId) {
        throw new BadRequestError_1.BadRequestError("Service Job ID is required");
    }
};
const toServiceJob = (serviceJob) => serviceJob;
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
class ServiceJobService {
    static async createServiceJob(data, 
    // requesterId: string,
    requesterRole) {
        const createData = sanitizeCreateData(data, requesterRole);
        const result = new service_job_model_1.ServiceJobModel(createData);
        await result.save();
        const savedServiceJob = await service_job_model_1.ServiceJobModel.findById(result._id)
            .populate(PATIENT_PROFILE_POPULATE)
            .populate(INVENTORY_PROFILE_POPULATE)
            .lean();
        invalidateServiceJobCache();
        return toServiceJob(savedServiceJob ?? result);
    }
    static async fetchServiceJobs(req) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const cacheKey = `service_job_page_${page}_limit_${limit}`;
        const cachedData = serviceJobCache.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }
        const [ServiceJobs, totalServiceJobs] = (await Promise.all([
            service_job_model_1.ServiceJobModel.find()
                .skip(skip)
                .limit(limit)
                .populate(PATIENT_PROFILE_POPULATE)
                .populate(INVENTORY_PROFILE_POPULATE)
                .lean()
                .sort({ createdAt: -1 }),
            service_job_model_1.ServiceJobModel.countDocuments(),
        ]));
        if (!ServiceJobs) {
            throw new BadRequestError_1.BadRequestError("Service Jobs not found!");
        }
        const responseData = {
            serviceJobs: ServiceJobs,
            totalServiceJobs: totalServiceJobs,
            currentPage: page,
            totalPages: Math.ceil(totalServiceJobs / limit),
        };
        //cache response
        serviceJobCache.set(cacheKey, responseData);
        // return ServiceJob.map(toServiceJob);
        return responseData;
    }
    static async fetchServiceJobById(serviceJobId, requesterId, requesterRole) {
        assertServiceJobId(serviceJobId);
        const serviceJob = await service_job_model_1.ServiceJobModel.findById(serviceJobId)
            .populate(PATIENT_PROFILE_POPULATE)
            .populate(INVENTORY_PROFILE_POPULATE)
            .lean();
        if (!serviceJob) {
            throw new BadRequestError_1.BadRequestError("Service Job not found!");
        }
        return toServiceJob(serviceJob);
    }
    static async updateServiceJob(serviceJobId, data, requesterID, requesterRole) {
        assertServiceJobId(serviceJobId);
        const updateData = sanitizeUpdateData(data, requesterRole);
        const serviceJob = await service_job_model_1.ServiceJobModel.findByIdAndUpdate(serviceJobId, updateData, {
            new: true,
            runValidators: true,
        })
            .populate(PATIENT_PROFILE_POPULATE)
            .populate(INVENTORY_PROFILE_POPULATE)
            .lean();
        if (!serviceJob) {
            throw new BadRequestError_1.BadRequestError("Service Job not found!");
        }
        invalidateServiceJobCache();
        return toServiceJob(serviceJob);
    }
    static async deleteServiceJob(serviceJobId, requesterId, requesterRole) {
        assertServiceJobId(serviceJobId);
        const serviceJob = await service_job_model_1.ServiceJobModel.findByIdAndDelete(serviceJobId).lean();
        if (!serviceJob) {
            throw new BadRequestError_1.BadRequestError("Service Job not found!");
        }
        invalidateServiceJobCache();
        return toServiceJob(serviceJob);
    }
}
exports.ServiceJobService = ServiceJobService;
//# sourceMappingURL=service-job.service.js.map