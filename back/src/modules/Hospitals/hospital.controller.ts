import { Response } from "express";
import { BadRequestError } from "../../common/errors/BadRequestError";
import { catchAsync } from "../../common/utils/catchAsync";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";

export const CreateHospital = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {},
);
