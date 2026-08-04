import { Router } from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { adminRoute } from "../../middleware/admin.middleware";
import {
  CreateCase,
  DeleteCase,
  FetchCaseById,
  FetchCases,
  UpdateCase,
} from "./case.controller";

export function CaseRouter(): Router {
  const router = Router();

  router.post("/create-case", protectRoute, adminRoute, CreateCase);
  router.get("/get-cases", protectRoute, adminRoute, FetchCases);
  router.get("/get-case/:id", protectRoute, adminRoute, FetchCaseById);
  router.put("/update-case/:id", protectRoute, adminRoute, UpdateCase);
  router.delete("/delete-case/:id", protectRoute, adminRoute, DeleteCase);

  return router;
}
