import { Router } from "express";
import { AuthRouter } from "../modules/Auth";
import { UserRouter } from "../modules/Users";
import { PatientRouter } from "../modules/Patients/patient.routes";
export function createRoutes(): Router {
  const router = Router();

  router.use("/auth", AuthRouter());
  router.use("/users", UserRouter());
  router.use("/patients", PatientRouter());

  return router;
}

export const appRouter = createRoutes();
