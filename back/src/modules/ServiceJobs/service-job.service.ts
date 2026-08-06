import mongoose from "mongoose";
import NodeCache from "node-cache";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { ServiceJobModel } from "./service-job.model";
import {
  CreateServiceJobDTO,
  UpdateServiceJobDTO,
  ServiceJob,
  ServiceJobListResponse,
} from "./service-job.types";
import { type Request } from "express";

const serviceJobCache = new NodeCache({ stdTTL: 300 });

const invalidateServiceJobCache = (): void => {
  serviceJobCache.flushAll();
};

const PATIENT_PROFILE_POPULATE = [
  {
    path: "patient",
    select:
      "firstName lastName dateOfBirth gender diagnosis phone email status address nextOfKin paymentMode referringDoctor referralType createdAt updatedAt",
  },
];

const INVENTORY_PROFILE_POPULATE = [
  {
    path: "equipment",
    select:
      "equipmentName category serialModel vehiclePlate location status rate notes createdAt updatedAt",
  },
];

const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);

const assertServiceJobId = (serviceJobId: string) => {
  if (!serviceJobId) {
    throw new BadRequestError("Service Job ID is required");
  }
};

const toServiceJob = (serviceJob: unknown): ServiceJob =>
  serviceJob as ServiceJob;

const sanitizeCreateData = (
  data: CreateServiceJobDTO,
  requesterRole?: string,
): Partial<CreateServiceJobDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Create data is required");
  }

  const createData = { ...data } as Record<string, unknown>;

  return createData as Partial<CreateServiceJobDTO>;
};

const sanitizeUpdateData = (
  data: UpdateServiceJobDTO,
  requesterRole?: string,
): Partial<UpdateServiceJobDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Update data is required");
  }

  const updateData = { ...data } as Record<string, unknown>;
  const restrictedFields = Object.keys(updateData).filter((field) => {
    if (BLOCKED_UPDATE_FIELDS.has(field)) {
      return true;
    }

    return requesterRole !== "SUPER_ADMIN" && ADMIN_ONLY_FIELDS.has(field);
  });

  if (restrictedFields.length > 0) {
    throw new BadRequestError(
      `You cannot update these fields: ${restrictedFields.join(", ")}`,
    );
  }

  return updateData as Partial<UpdateServiceJobDTO>;
};

export class ServiceJobService {
  static async createServiceJob(
    data: CreateServiceJobDTO,
    // requesterId: string,
    requesterRole: string,
  ): Promise<ServiceJob> {
    const createData = sanitizeCreateData(data, requesterRole);
    const result = new ServiceJobModel(createData);

    await result.save();

    const savedServiceJob = await ServiceJobModel.findById(result._id)
      .populate(PATIENT_PROFILE_POPULATE)
      .populate(INVENTORY_PROFILE_POPULATE)
      .lean();

    invalidateServiceJobCache();
    return toServiceJob(savedServiceJob ?? result);
  }

  static async fetchServiceJobs(req: Request): Promise<ServiceJobListResponse> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `service_job_page_${page}_limit_${limit}`;
    const cachedData = serviceJobCache.get<ServiceJobListResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [ServiceJobs, totalServiceJobs] = (await Promise.all([
      ServiceJobModel.find()
        .skip(skip)
        .limit(limit)
        .populate(PATIENT_PROFILE_POPULATE)
        .populate(INVENTORY_PROFILE_POPULATE)
        .lean()
        .sort({ createdAt: -1 }),
      ServiceJobModel.countDocuments(),
    ])) as unknown as [ServiceJob[], number];

    if (!ServiceJobs) {
      throw new BadRequestError("Service Jobs not found!");
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

  static async fetchServiceJobById(
    serviceJobId: string,
    requesterId: string,
    requesterRole: string,
  ): Promise<ServiceJob> {
    assertServiceJobId(serviceJobId);

    const serviceJob = await ServiceJobModel.findById(serviceJobId)
      .populate(PATIENT_PROFILE_POPULATE)
      .populate(INVENTORY_PROFILE_POPULATE)
      .lean();

    if (!serviceJob) {
      throw new BadRequestError("Service Job not found!");
    }
    return toServiceJob(serviceJob);
  }

  static async updateServiceJob(
    serviceJobId: string,
    data: UpdateServiceJobDTO,
    requesterID: string,
    requesterRole: string,
  ): Promise<ServiceJob> {
    assertServiceJobId(serviceJobId);

    const updateData = sanitizeUpdateData(data, requesterRole);
    const serviceJob = await ServiceJobModel.findByIdAndUpdate(
      serviceJobId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate(PATIENT_PROFILE_POPULATE)
      .populate(INVENTORY_PROFILE_POPULATE)
      .lean();

    if (!serviceJob) {
      throw new BadRequestError("Service Job not found!");
    }

    invalidateServiceJobCache();
    return toServiceJob(serviceJob);
  }

  static async deleteServiceJob(
    serviceJobId: string,
    requesterId: string,
    requesterRole?: string,
  ): Promise<ServiceJob> {
    assertServiceJobId(serviceJobId);

    const serviceJob =
      await ServiceJobModel.findByIdAndDelete(serviceJobId).lean();

    if (!serviceJob) {
      throw new BadRequestError("Service Job not found!");
    }

    invalidateServiceJobCache();
    return toServiceJob(serviceJob);
  }
}
