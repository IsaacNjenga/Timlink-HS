import { Response } from "express";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { catchAsync } from "../../common/utils/catchAsync";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDTO, UpdateDoctorDTO } from "./doctor.types";
import { createLog } from "../Logs";

const getDoctorIdParam = (id: string | string[] | undefined): string => {
  if (!id) {
    throw new BadRequestError("Doctor ID is required!");
  }

  return Array.isArray(id) ? id[0] : id;
};

//to-do: make the code
export const CreateDoctor = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const doctorData = await DoctorService.createDoctor(
      req.body as CreateDoctorDTO,
      req.user.role,
    );

    if (doctorData) {
      await createLog({
        type: "doctor",
        refId: doctorData._id.toString(),
        action: "created",
        title: "New doctor created",
        description: `Doctor: ${doctorData.firstName} with ID ${doctorData._id} was created`,
        refModel: "doctor",
        actor: req.user?._id,
      });
    }

    res.status(201).json({
      success: true,
      data: doctorData,
      message: "Doctor information has been created successfully",
    });
  },
);

export const FetchDoctors = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const doctorsData = await DoctorService.fetchDoctors(req);

    if (doctorsData && req.user?._id) {
      await createLog({
        type: "doctor",
        refId: req.user._id.toString(),
        action: "fetched",
        title: "Doctors fetched",
        description: `Doctor list was fetched`,
        refModel: "doctor",
        actor: req.user?._id,
      });
    }

    res.status(200).json({
      success: true,
      data: doctorsData,
      message: "Doctors fetched successfully",
    });
  },
);

export const FetchDoctorById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getDoctorIdParam(req.params.id);

    const doctor = await DoctorService.fetchDoctorById(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "doctor",
      refId: id,
      action: "received",
      title: "Doctor profile retrieved",
      description: `Fetched profile for Doctor ${id}`,
      refModel: "doctor",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: doctor,
      message: "Doctor retrieved successfully",
    });
  },
);

export const UpdateDoctor = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getDoctorIdParam(req.params.id);

    const doctor = await DoctorService.updateDoctor(
      id,
      req.body as UpdateDoctorDTO,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "doctor",
      refId: id,
      action: "updated",
      title: "Doctor updated",
      description: `Updated profile for Doctor ${id}`,
      refModel: "doctor",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: doctor,
      message: "Doctor updated successfully",
    });
  },
);

export const DeleteDoctor = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getDoctorIdParam(req.params.id);

    const doctor = await DoctorService.deleteDoctor(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "doctor",
      refId: id,
      action: "deleted",
      title: "Doctor deleted",
      description: `Deleted Doctor ${id}`,
      refModel: "doctor",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: doctor,
      message: "Doctor deleted successfully",
    });
  },
);
