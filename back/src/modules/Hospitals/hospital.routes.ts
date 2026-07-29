import { Router } from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { adminRoute } from "../../middleware/admin.middleware";
import { CreateHospital } from "./hospital.controller";

export function PatientRouter(): Router {
  const router = Router();

  router.post("/create-hospital", protectRoute, adminRoute, CreateHospital);

  return router;
}
