import { Router } from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { adminRoute } from "../../middleware/admin.middleware";
import {
  CreateHospital,
  DeleteHospital,
  FetchHospitalById,
  FetchHospitals,
  UpdateHospital,
} from "./hospital.controller";

export function HospitalRouter(): Router {
  const router = Router();

  router.post("/create-hospital", protectRoute, adminRoute, CreateHospital);
  router.get("/get-hospital", protectRoute, adminRoute, FetchHospitals);
  router.get("/get-hospital/:id", protectRoute, adminRoute, FetchHospitalById);
  router.put("/update-hospital/:id", protectRoute, adminRoute, UpdateHospital);
  router.delete(
    "/delete-hospital/:id",
    protectRoute,
    adminRoute,
    DeleteHospital,
  );

  return router;
}
