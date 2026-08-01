import { Router } from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { adminRoute } from "../../middleware/admin.middleware";
import {
  CreateDoctor,
  DeleteDoctor,
  FetchDoctorById,
  FetchDoctors,
  UpdateDoctor,
} from "./doctor.controller";

export function DoctorRouter(): Router {
  const router = Router();

  router.post("/create-doctor", protectRoute, adminRoute, CreateDoctor);
  router.get("/get-doctors", protectRoute, adminRoute, FetchDoctors);
  router.get("/get-doctor/:id", protectRoute, adminRoute, FetchDoctorById);
  router.put("/update-doctor/:id", protectRoute, adminRoute, UpdateDoctor);
  router.delete("/delete-doctor/:id", protectRoute, adminRoute, DeleteDoctor);

  return router;
}
