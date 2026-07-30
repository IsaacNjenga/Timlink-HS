import NodeCache from "node-cache";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { type Request } from "express";
import { HospitalModel } from "./hospital.model";
import {
  CreateHospitalDTO,
  HospitalListResponse,
  Hospital,
  UpdateHospitalDTO,
} from "./hospital.types";

const hospitalCache = new NodeCache({ stdTTL: 300 });

const invalidateHospitalCache = (): void => {
  hospitalCache.flushAll();
};

const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);

const assertHospitalId = (hospitalId: string) => {
  if (!hospitalId) {
    throw new BadRequestError("Hospital ID is required");
  }
};

const toHospital = (hospital: unknown): Hospital => hospital as Hospital;

const sanitizeCreateData = (
  data: CreateHospitalDTO,
  requesterRole?: string,
): Partial<CreateHospitalDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Create data is required");
  }

  const createData = { ...data } as Record<string, unknown>;

  return createData as Partial<CreateHospitalDTO>;
};

const sanitizeUpdateData = (
  data: UpdateHospitalDTO,
  requesterRole?: string,
): Partial<UpdateHospitalDTO> => {
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

  return updateData as Partial<UpdateHospitalDTO>;
};

export class HospitalService {
  static async createHospital(
    data: CreateHospitalDTO,
    // requesterId: string,
    requesterRole: string,
  ): Promise<Hospital> {
    const createData = sanitizeCreateData(data, requesterRole);
    const result = new HospitalModel(createData);

    await result.save();

    invalidateHospitalCache();
    return toHospital(result);
  }

  static async fetchHospitals(req: Request): Promise<HospitalListResponse> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `hospital_page_${page}_limit_${limit}`;
    const cachedData = hospitalCache.get<HospitalListResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [hospitals, totalHospitals] = (await Promise.all([
      HospitalModel.find()
        .skip(skip)
        .limit(limit)
        .lean()
        .sort({ createdAt: -1 }),
      HospitalModel.countDocuments(),
    ])) as unknown as [Hospital[], number];

    if (!hospitals) {
      throw new BadRequestError("Hospitals not found!");
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

  static async fetchHospitalById(
    hospitalId: string,
    requesterId: string,
    requesterRole: string,
  ): Promise<Hospital> {
    assertHospitalId(hospitalId);

    const hospital = await HospitalModel.findById(hospitalId).lean();

    if (!hospital) {
      throw new BadRequestError("Hospital not found!");
    }
    return toHospital(hospital);
  }

  static async updateHospital(
    hospitalId: string,
    data: UpdateHospitalDTO,
    requesterID: string,
    requesterRole: string,
  ): Promise<Hospital> {
    assertHospitalId(hospitalId);

    const updateData = sanitizeUpdateData(data, requesterRole);
    const hospital = await HospitalModel.findByIdAndUpdate(
      hospitalId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!hospital) {
      throw new BadRequestError("Hospital not found!");
    }

    invalidateHospitalCache();
    return toHospital(hospital);
  }

  static async deleteHospital(
    hospitalId: string,
    requesterId: string,
    requesterRole?: string,
  ): Promise<Hospital> {
    assertHospitalId(hospitalId);

    const hospital = await HospitalModel.findByIdAndDelete(hospitalId).lean();

    if (!hospital) {
      throw new BadRequestError("Hospital not found!");
    }

    invalidateHospitalCache();
    return toHospital(hospital);
  }
}
