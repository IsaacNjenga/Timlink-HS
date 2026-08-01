import NodeCache from "node-cache";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { type Request } from "express";
import { DoctorModel } from "./doctor.model";
import {
  CreateDoctorDTO,
  DoctorListResponse,
  Doctor,
  UpdateDoctorDTO,
} from "./doctor.types";

const doctorCache = new NodeCache({ stdTTL: 300 });

const invalidateDoctorCache = (): void => {
  doctorCache.flushAll();
};

const HOSPITAL_PROFILE_POPULATE = [
  {
    path: "partnerHospitals",
    select:
      "hospitalName code tier phone email emergencyExt location operationalCapacity insurancePanels status createdAt updatedAt",
  },
];

const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);

const assertDoctorId = (doctorId: string) => {
  if (!doctorId) {
    throw new BadRequestError("Doctor ID is required");
  }
};

const toDoctor = (doctor: unknown): Doctor => doctor as Doctor;

const sanitizeCreateData = (
  data: CreateDoctorDTO,
  requesterRole?: string,
): Partial<CreateDoctorDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Create data is required");
  }

  const createData = { ...data } as Record<string, unknown>;

  return createData as Partial<CreateDoctorDTO>;
};

const sanitizeUpdateData = (
  data: UpdateDoctorDTO,
  requesterRole?: string,
): Partial<UpdateDoctorDTO> => {
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

  return updateData as Partial<UpdateDoctorDTO>;
};

export class DoctorService {
  static async createDoctor(
    data: CreateDoctorDTO,
    // requesterId: string,
    requesterRole: string,
  ): Promise<Doctor> {
    const createData = sanitizeCreateData(data, requesterRole);
    const result = new DoctorModel(createData);

    await result.save();

    invalidateDoctorCache();
    return toDoctor(result);
  }

  static async fetchDoctors(req: Request): Promise<DoctorListResponse> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `doctor_page_${page}_limit_${limit}`;
    const cachedData = doctorCache.get<DoctorListResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [doctors, totalDoctors] = (await Promise.all([
      DoctorModel.find()
        .skip(skip)
        .limit(limit)
        .populate(HOSPITAL_PROFILE_POPULATE)
        .lean()
        .sort({ createdAt: -1 }),
      DoctorModel.countDocuments(),
    ])) as unknown as [Doctor[], number];

    if (!doctors) {
      throw new BadRequestError("Doctors not found!");
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

  static async fetchDoctorById(
    doctorId: string,
    requesterId: string,
    requesterRole: string,
  ): Promise<Doctor> {
    assertDoctorId(doctorId);

    const doctor = await DoctorModel.findById(doctorId)
      .populate(HOSPITAL_PROFILE_POPULATE)
      .lean();

    if (!doctor) {
      throw new BadRequestError("Doctor not found!");
    }
    return toDoctor(doctor);
  }

  static async updateDoctor(
    doctorId: string,
    data: UpdateDoctorDTO,
    requesterID: string,
    requesterRole: string,
  ): Promise<Doctor> {
    assertDoctorId(doctorId);

    const updateData = sanitizeUpdateData(data, requesterRole);
    const doctor = await DoctorModel.findByIdAndUpdate(doctorId, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!doctor) {
      throw new BadRequestError("Doctor not found!");
    }

    invalidateDoctorCache();
    return toDoctor(doctor);
  }

  static async deleteDoctor(
    doctorId: string,
    requesterId: string,
    requesterRole?: string,
  ): Promise<Doctor> {
    assertDoctorId(doctorId);

    const doctor = await DoctorModel.findByIdAndDelete(doctorId).lean();

    if (!doctor) {
      throw new BadRequestError("Doctor not found!");
    }

    invalidateDoctorCache();
    return toDoctor(doctor);
  }
}
