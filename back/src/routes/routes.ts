import { Router } from "express";
import { AuthRouter } from "../modules/Auth";
import { UserRouter } from "../modules/Users";
import { PatientRouter } from "../modules/Patients/patient.routes";
import { HospitalRouter } from "../modules/Hospitals/hospital.routes";
import { DoctorRouter } from "../modules/Doctors/doctor.routes";

export function createRoutes(): Router {
  const router = Router();

  router.use("/auth", AuthRouter());
  router.use("/users", UserRouter());
  router.use("/patients", PatientRouter());
  router.use("/hospitals", HospitalRouter());
  router.use("/doctors", DoctorRouter());

  return router;
}

export const appRouter = createRoutes();
