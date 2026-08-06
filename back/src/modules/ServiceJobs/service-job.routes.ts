import { Router } from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { adminRoute } from "../../middleware/admin.middleware";
import {
  CreateServiceJob,
  FetchServiceJobById,
  FetchAllServiceJobs,
  UpdateServiceJob,
  DeleteServiceJob,
} from "./service-job.controller";

export function ServiceJobRouter(): Router {
  const router = Router();

  router.post(
    "/create-service-job",
    protectRoute,
    adminRoute,
    CreateServiceJob,
  );
  router.get(
    "/get-service-jobs",
    protectRoute,
    adminRoute,
    FetchAllServiceJobs,
  );
  router.get(
    "/get-service-job/:id",
    protectRoute,
    adminRoute,
    FetchServiceJobById,
  );
  router.put(
    "/update-service-job/:id",
    protectRoute,
    adminRoute,
    UpdateServiceJob,
  );
  router.delete(
    "/delete-service-job/:id",
    protectRoute,
    adminRoute,
    DeleteServiceJob,
  );

  return router;
}
