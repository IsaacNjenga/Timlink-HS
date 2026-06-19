import { Router } from "express";
import { AuthRouter } from "../modules/Auth";
import { UserRouter } from "../modules/Users";
export function createRoutes(): Router {
  const router = Router();

  router.use("/auth", AuthRouter());
  router.use("/users", UserRouter());

  return router;
}

export const appRouter = createRoutes();