import { Response } from "express";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { catchAsync } from "../../common/utils/catchAsync";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { CaseService } from "./case.service";
import { CreateCaseDTO, UpdateCaseDTO } from "./case.types";
import { createLog } from "../Logs";

const getcaseIdParam = (id: string | string[] | undefined): string => {
  if (!id) {
    throw new BadRequestError("case ID is required!");
  }

  return Array.isArray(id) ? id[0] : id;
};

export const CreateCase = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const caseData = await CaseService.createCase(
      req.body as CreateCaseDTO,
      req.user.role,
    );

    if (caseData) {
      await createLog({
        type: "case",
        refId: caseData._id.toString(),
        action: "created",
        title: "New case created",
        description: `case: ${caseData._id.toString()} was created`,
        refModel: "case",
        actor: req.user?._id,
      });
    }

    res.status(201).json({
      success: true,
      data: caseData,
      message: "Case information has been created successfully",
    });
  },
);

export const FetchCases = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const casesData = await CaseService.fetchCases(req);

    if (casesData && req.user?._id) {
      await createLog({
        type: "case",
        refId: req.user._id.toString(),
        action: "fetched",
        title: "Cases fetched",
        description: `Case list was fetched`,
        refModel: "case",
        actor: req.user?._id,
      });
    }

    res.status(200).json({
      success: true,
      data: casesData,
      message: "Cases fetched successfully",
    });
  },
);

export const FetchCaseById = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getcaseIdParam(req.params.id);

    const caseData = await CaseService.fetchCaseById(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "case",
      refId: id,
      action: "received",
      title: "Case info retrieved",
      description: `Fetched information for case ${id}`,
      refModel: "case",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: caseData,
      message: "Case retrieved successfully",
    });
  },
);

export const UpdateCase = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getcaseIdParam(req.params.id);

    const caseData = await CaseService.updateCase(
      id,
      req.body as UpdateCaseDTO,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "case",
      refId: id,
      action: "updated",
      title: "Case updated",
      description: `Updated case ${id}`,
      refModel: "case",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: caseData,
      message: "Case updated successfully",
    });
  },
);

export const DeleteCase = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const id = getcaseIdParam(req.params.id);

    const caseData = await CaseService.deleteCase(
      id,
      req.user._id.toString(),
      req.user.role,
    );

    await createLog({
      type: "case",
      refId: id,
      action: "deleted",
      title: "Case deleted",
      description: `Deleted case ${id}`,
      refModel: "case",
      actor: req.user?._id,
    });

    res.status(200).json({
      success: true,
      data: caseData,
      message: "Case deleted successfully",
    });
  },
);
