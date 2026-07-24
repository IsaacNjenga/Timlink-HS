import { Response } from "express";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { catchAsync } from "../../common/utils/catchAsync";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { createLog } from "../Logs/logs.service";
import { PatientService } from "./patient.service";
import { CreatePatientDTO, UpdatePatientDTO } from "./patient.types";

const getPatientIdParam = (id: string | string[] | undefined): string => {
  if (!id) {
    throw new BadRequestError("Patient ID is required!");
  }

  return Array.isArray(id) ? id[0] : id;
};

export const CreatePatient = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const patientData = await PatientService.createPatient(
      req.body as CreatePatientDTO,
      req.user.role,
    );

    if (patientData) {
      await createLog({
        type: "patient",
        refId: patientData._id.toString(),
        action: "created",
        title: "New patient created",
        description: `Patient ${patientData.firstName} ${patientData.lastName} was created`,
        refModel: "patient",
      });
    }

    res.status(201).json({
      success: true,
      data: patientData,
      message: "Patient info created successfully",
    });
  },
);

export const FetchPatients = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const patientsData = await PatientService.fetchPatients(req);

    if (patientsData && req.user?._id) {
      await createLog({
        type: "patient",
        refId: req.user._id.toString(),
        action: "fetched",
        title: "Patients fetches",
        description: "Patient list was fetched",
        refModel: "patient",
      });
    }

    res.status(200).json({
      success: true,
      data: patientsData,
      message: "Patients fetched successfully",
    });
  },
);

export const FetchPatientById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getPatientIdParam(req.params.id);

    const patient = await PatientService.fetchPatientById(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "patient",
      refId: id,
      action: "received",
      title: "Patient profile retrieved",
      description: `Fetched profile for patient ${id}`,
      refModel: "patient",
    });

    res.status(200).json({
      success: true,
      data: patient,
      message: "User retrieved successfully",
    });
  },
);

export const UpdatePatient = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getPatientIdParam(req.params.id);

    const patient = await PatientService.updatePatient(
      id,
      req.body as UpdatePatientDTO,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "patient",
      refId: id,
      action: "updated",
      title: "Patient updated",
      description: `Updated profile for patient ${id}`,
      refModel: "patient",
    });

    res.status(200).json({
      success: true,
      data: patient,
      message: "User updated successfully",
    });
  },
);

export const PatchPatient = UpdatePatient;

export const DeletePatient = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getPatientIdParam(req.params.id);

    const patient = await PatientService.deletePatient(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "patient",
      refId: id,
      action: "deleted",
      title: "Patient deleted",
      description: `Deleted patient ${id}`,
      refModel: "patient",
    });

    res.status(200).json({
      success: true,
      data: patient,
      message: "Patient deleted successfully",
    });
  },
);
