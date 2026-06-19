import { Response, NextFunction } from "express";
import { BadRequestError } from "../common/errors/BadRequestError";
import { catchAsync } from "../common/utils/catchAsync";
import { AuthenticatedRequest } from "./auth.middleware";

export const adminRoute = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "SUPER_ADMIN") {
      throw new BadRequestError(
        "Only admins can access this route. Access denied!",
      );
    }

    next();
  },
);