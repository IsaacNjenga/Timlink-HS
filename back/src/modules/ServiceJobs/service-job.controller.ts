import { Response } from "express";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { catchAsync } from "../../common/utils/catchAsync";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { ServiceJobService } from "./service-job.service";
import { CreateServiceJobDTO, UpdateServiceJobDTO } from "./service-job.types";
import { createLog } from "../Logs";

const getServiceJobIdParam = (id: string | string[] | undefined): string => {
  if (!id) {
    throw new BadRequestError("Service Job ID is required!");
  }

  return Array.isArray(id) ? id[0] : id;
};

//to-do: make the code
export const CreateServiceJob = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const serviceJobData = await ServiceJobService.createServiceJob(
      req.body as CreateServiceJobDTO,
      req.user.role,
    );

    if (serviceJobData) {
      await createLog({
        type: "ServiceJob",
        refId: serviceJobData._id.toString(),
        action: "created",
        title: "New Service Job created",
        description: `Service Job: ${serviceJobData?.serviceType} at location: ${serviceJobData?.facilityLocation} was created`,
        refModel: "service-job",
        actor: req.user?._id,
      });
    }

    res.status(201).json({
      success: true,
      data: serviceJobData,
      message: "Service job has been created successfully",
    });
  },
);

export const FetchAllServiceJobs = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const serviceJobData = await ServiceJobService.fetchServiceJobs(req);

    if (serviceJobData && req.user?._id) {
      await createLog({
        type: "serviceJob",
        refId: req.user._id.toString(),
        action: "fetched",
        title: "All Service Jobs fetched",
        description: `Service Jobs list was fetched`,
        refModel: "service-job",
        actor: req.user?._id,
      });
    }

    res.status(200).json({
      success: true,
      data: serviceJobData,
      message: "All Service Jobs fetched successfully",
    });
  },
);

export const FetchServiceJobById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getServiceJobIdParam(req.params.id);

    const serviceJob = await ServiceJobService.fetchServiceJobById(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "serviceJob",
      refId: id,
      action: "received",
      title: "Service Job retrieved",
      description: `Fetched Service Job: ${id}`,
      refModel: "service-job",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: serviceJob,
      message: "Service Job item retrieved successfully",
    });
  },
);

export const UpdateServiceJob = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getServiceJobIdParam(req.params.id);

    const serviceJob = await ServiceJobService.updateServiceJob(
      id,
      req.body as UpdateServiceJobDTO,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "serviceJob",
      refId: id,
      action: "updated",
      title: "Service Job updated",
      description: `Updated Service Job: ${id}`,
      refModel: "service-job",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: serviceJob,
      message: "Service Job item updated successfully",
    });
  },
);

export const DeleteServiceJob = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getServiceJobIdParam(req.params.id);

    await ServiceJobService.deleteServiceJob(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "serviceJob",
      refId: id,
      action: "deleted",
      title: "Service Job deleted",
      description: `Deleted Service Job: ${id}`,
      refModel: "service-job",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      message: "Service Job deleted successfully",
    });
  },
);
