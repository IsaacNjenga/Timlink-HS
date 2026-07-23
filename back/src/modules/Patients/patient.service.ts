import { BadRequestError } from "../../common/errors/BadRequestError";
import { UserModel } from "../Users/user.model";
import { PatientModel } from "./patient.model";
import { CreatePatientDTO, UpdatePatientDTO, Patient } from "./patient.types";

const DOCTOR_PROFILE_POPULATE = [
  {
    path: "profile",
    populate: { path: "role" },
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

const sanitizeCreateData = (
  data: CreatePatientDTO,
  requesterRole?: string,
): Partial<CreatePatientDTO> => {
  if (!data || Object.keys(data).length === 0) {
    throw new BadRequestError("Create data is required");
  }

  const createData = { ...data } as Record<string, unknown>;

  return createData as Partial<CreatePatientDTO>;
};

const sanitizeUpdateData = (
  data: UpdatePatientDTO,
  requesterRole?: string,
): Partial<UpdatePatientDTO> => {
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

  return updateData as Partial<UpdatePatientDTO>;
};

export class PatientService {
  static async createPatient(
    data: CreatePatientDTO,
    requesterId: string,
    requesterRole: string,
  ): Promise<Patient> {
    const createData = sanitizeCreateData(data, requesterRole);
    const result = new PatientModel(createData);

    await result.save();

    return toPatient(result);
  }

  static async fetchPatients(): Promise<Patient[]> {
    const patient = await PatientModel.find()
      .populate(DOCTOR_PROFILE_POPULATE)
      .lean();

    if (!patient) {
      throw new BadRequestError("Patient not found!");
    }
    return patient.map(toPatient);
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
    const patient = await UserModel.findByIdAndUpdate(patientId, updateData, {
      new: true,
      runValidators: true,
    })
      .populate(DOCTOR_PROFILE_POPULATE)
      .lean();

    if (!patient) {
      throw new BadRequestError("Patient not found!");
    }

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
    return toPatient(patient);
  }
}
