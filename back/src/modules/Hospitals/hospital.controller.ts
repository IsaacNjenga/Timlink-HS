import { Response } from "express";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { catchAsync } from "../../common/utils/catchAsync";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { HospitalService } from "./hospital.service";
import { CreateHospitalDTO, UpdateHospitalDTO } from "./hospital.types";
import { createLog } from "../Logs";

const getHospitalIdParam = (id: string | string[] | undefined): string => {
  if (!id) {
    throw new BadRequestError("Hospital ID is required!");
  }

  return Array.isArray(id) ? id[0] : id;
};

//to-do: make the code
export const CreateHospital = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const hospitalData = await HospitalService.createHospital(
      req.body as CreateHospitalDTO,
      req.user.role,
    );

    if (hospitalData) {
      await createLog({
        type: "hospital",
        refId: hospitalData._id.toString(),
        action: "created",
        title: "New hospital created",
        description: `Hospital: ${hospitalData.hospitalName} code: ${hospitalData.code} was created`,
        refModel: "hospital",
        actor: req.user?._id,
      });
    }

    res.status(201).json({
      success: true,
      data: hospitalData,
      message: "Hospital info has been created successfully",
    });
  },
);

export const FetchHospitals = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const hospitalsData = await HospitalService.fetchHospitals(req);

    if (hospitalsData && req.user?._id) {
      await createLog({
        type: "hospital",
        refId: req.user._id.toString(),
        action: "fetched",
        title: "Hospitals fetched",
        description: `Hospital list was fetched`,
        refModel: "hospital",
        actor: req.user?._id,
      });
    }

    res.status(200).json({
      success: true,
      data: hospitalsData,
      message: "Hospitals fetched successfully",
    });
  },
);

export const FetchHospitalById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getHospitalIdParam(req.params.id);

    const hospital = await HospitalService.fetchHospitalById(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "hospital",
      refId: id,
      action: "received",
      title: "Hospital profile retrieved",
      description: `Fetched profile for Hospital ${id}`,
      refModel: "hospital",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: hospital,
      message: "Hospital retrieved successfully",
    });
  },
);

export const UpdateHospital = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getHospitalIdParam(req.params.id);

    const hospital = await HospitalService.updateHospital(
      id,
      req.body as UpdateHospitalDTO,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "hospital",
      refId: id,
      action: "updated",
      title: "Hospital updated",
      description: `Updated profile for Hospital ${id}`,
      refModel: "hospital",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: hospital,
      message: "Hospital updated successfully",
    });
  },
);

export const DeleteHospital = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getHospitalIdParam(req.params.id);

    const hospital = await HospitalService.deleteHospital(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "hospital",
      refId: id,
      action: "deleted",
      title: "Hospital deleted",
      description: `Deleted Hospital ${id}`,
      refModel: "hospital",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: hospital,
      message: "Hospital deleted successfully",
    });
  },
);
