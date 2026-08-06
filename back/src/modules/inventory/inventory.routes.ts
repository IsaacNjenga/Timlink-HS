import { Router } from "express";
import { protectRoute } from "../../middleware/auth.middleware";
import { adminRoute } from "../../middleware/admin.middleware";
import {
  CreateInventory,
  DeleteInventory,
  FetchInventoryById,
  FetchAllInventory,
  UpdateInventory,
} from "./inventory.controller";

export function InventoryRouter(): Router {
  const router = Router();

  router.post("/create-inventory", protectRoute, adminRoute, CreateInventory);
  router.get("/get-inventory", protectRoute, adminRoute, FetchAllInventory);
  router.get(
    "/get-inventory/:id",
    protectRoute,
    adminRoute,
    FetchInventoryById,
  );
  router.put(
    "/update-inventory/:id",
    protectRoute,
    adminRoute,
    UpdateInventory,
  );
  router.delete(
    "/delete-inventory/:id",
    protectRoute,
    adminRoute,
    DeleteInventory,
  );

  return router;
}
