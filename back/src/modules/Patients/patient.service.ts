import mongoose from "mongoose";
import NodeCache from "node-cache";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { PatientModel } from "./patient.model";
import {
  CreatePatientDTO,
  UpdatePatientDTO,
  Patient,
  PatientListResponse,
} from "./patient.types";
import { type Request } from "express";

const patientCache = new NodeCache({ stdTTL: 300 });

const invalidatePatientCache = (): void => {
  patientCache.flushAll();
};

const DOCTOR_PROFILE_POPULATE = [
  {
    path: "referringDoctor",
    select:
      "firstName lastName specialty phone email status createdAt updatedAt",
  },
];

const ADMIN_ONLY_FIELDS = new Set(["role"]);
const BLOCKED_UPDATE_FIELDS = new Set(["_id", "id"]);

const assertPatientId = (patientId: string) => {
  if (!patientId) {
    throw new BadRequestError("Patient ID is required");
  }
};

const toPatient = (patient: unknown): Patient => patient as Patient;

const normalizeReferringDoctor = (
  value: unknown,
): mongoose.Types.ObjectId | undefined => {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    if (mongoose.Types.ObjectId.isValid(value)) {
      return new mongoose.Types.ObjectId(value);
    }

    return undefined;
  }

  if (typeof value === "object") {
    const doctor = value as Record<string, unknown>;
    const candidateId =
      typeof doctor._id === "string"
        ? doctor._id
        : typeof doctor.id === "string"
          ? doctor.id
          : undefined;

    if (candidateId && mongoose.Types.ObjectId.isValid(candidateId)) {
      return new mongoose.Types.ObjectId(candidateId);
    }
  }

  return undefined;
};

const normalizeNextOfKin = (value: unknown): unknown => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "object") {
    return [value];
  }

  return [];
};

const normalizePatientPayload = (data: Record<string, unknown>) => {
  const normalizedData = { ...data };

  if (
    normalizedData.referralType !== "referral doctor" &&
    "referringDoctor" in normalizedData
  ) {
    delete normalizedData.referringDoctor;
  } else {
    const normalizedDoctorId = normalizeReferringDoctor(
      normalizedData.referringDoctor,
    );

    if (normalizedDoctorId) {
      normalizedData.referringDoctor = normalizedDoctorId;
    }
  }

  if ("nextOfKin" in normalizedData) {
    normalizedData.nextOfKin = normalizeNextOfKin(normalizedData.nextOfKin);
  }

  return normalizedData;
};

const sanitizeCreateData = (
  data: CreatePatientDTO,
  requesterRole?: string,
): Partial<CreatePatientDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Create data is required");
  }

  const createData = normalizePatientPayload({ ...data } as Record<
    string,
    unknown
  >);

  return createData as Partial<CreatePatientDTO>;
};

const sanitizeUpdateData = (
  data: UpdatePatientDTO,
  requesterRole?: string,
): Partial<UpdatePatientDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Update data is required");
  }

  const updateData = normalizePatientPayload({ ...data } as Record<
    string,
    unknown
  >);
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

  return updateData as Partial<UpdatePatientDTO>;
};

export class PatientService {
  static async createPatient(
    data: CreatePatientDTO,
    // requesterId: string,
    requesterRole: string,
  ): Promise<Patient> {
    const createData = sanitizeCreateData(data, requesterRole);
    const result = new PatientModel(createData);

    await result.save();

    const savedPatient = await PatientModel.findById(result._id)
      .populate(DOCTOR_PROFILE_POPULATE)
      .lean();

    invalidatePatientCache();
    return toPatient(savedPatient ?? result);
  }

  static async fetchPatients(req: Request): Promise<PatientListResponse> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const cacheKey = `patient_page_${page}_limit_${limit}`;
    const cachedData = patientCache.get<PatientListResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const [patients, totalPatients] = (await Promise.all([
      PatientModel.find()
        .skip(skip)
        .limit(limit)
        .populate(DOCTOR_PROFILE_POPULATE)
        .lean()
        .sort({ createdAt: -1 }),
      PatientModel.countDocuments(),
    ])) as unknown as [Patient[], number];

    if (!patients) {
      throw new BadRequestError("Patients not found!");
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

  static async fetchPatientById(
    patientId: string,
    requesterId: string,
    requesterRole: string,
  ): Promise<Patient> {
    assertPatientId(patientId);

    const patient = await PatientModel.findById(patientId)
      .populate(DOCTOR_PROFILE_POPULATE)
      .lean();

    if (!patient) {
      throw new BadRequestError("Patient not found!");
    }
    return toPatient(patient);
  }

  static async updatePatient(
    patientId: string,
    data: UpdatePatientDTO,
    requesterID: string,
    requesterRole: string,
  ): Promise<Patient> {
    assertPatientId(patientId);

    const updateData = sanitizeUpdateData(data, requesterRole);
    const patient = await PatientModel.findByIdAndUpdate(
      patientId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    )
      .populate(DOCTOR_PROFILE_POPULATE)
      .lean();

    if (!patient) {
      throw new BadRequestError("Patient not found!");
    }

    invalidatePatientCache();
    return toPatient(patient);
  }

  static async deletePatient(
    patientId: string,
    requesterId: string,
    requesterRole?: string,
  ): Promise<Patient> {
    assertPatientId(patientId);

    const patient = await PatientModel.findByIdAndDelete(patientId).lean();

    if (!patient) {
      throw new BadRequestError("Patient not found!");
    }

    invalidatePatientCache();
    return toPatient(patient);
  }
}
