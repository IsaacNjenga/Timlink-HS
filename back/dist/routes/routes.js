"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
exports.createRoutes = createRoutes;
const express_1 = require("express");
const Auth_1 = require("../modules/Auth");
const Users_1 = require("../modules/Users");
function createRoutes() {
    const router = (0, express_1.Router)();
    router.use("/auth", (0, Auth_1.AuthRouter)());
    router.use("/users", (0, Users_1.UserRouter)());
    return router;
}
exports.appRouter = createRoutes();
//# sourceMappingURL=routes.js.map