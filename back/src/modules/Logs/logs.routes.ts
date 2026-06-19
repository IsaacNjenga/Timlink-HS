import { Router } from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { adminRoute } from "../../middleware/admin.middleware";
import { fetchAllLogs } from "./logs.controller";

export function LogsRouter(): Router {
  const router = Router();

  router.get("/fetch-logs", protectRoute, adminRoute, fetchAllLogs);
  return router;
}