import { Router } from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { adminRoute } from "../../middleware/admin.middleware";
import {
  CreatePatient,
  FetchPatientById,
  FetchPatients,
  UpdatePatient,
  DeletePatient,
} from "./patient.controller";

export function PatientRouter(): Router {
  const router = Router();

  router.post("create-patient", protectRoute, adminRoute, CreatePatient);
  router.get("/get-patients", protectRoute, adminRoute, FetchPatients);
  router.get("/get-patient/:id", protectRoute, adminRoute, FetchPatientById);
  router.put("/update-patient/:id", protectRoute, adminRoute, UpdatePatient);
  router.delete("/delete-patient/:id", protectRoute, adminRoute, DeletePatient);

  return router;
}
