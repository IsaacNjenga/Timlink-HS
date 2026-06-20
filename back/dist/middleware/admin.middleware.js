"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const BadRequestError_1 = require("../common/errors/BadRequestError");
const catchAsync_1 = require("../common/utils/catchAsync");
exports.adminRoute = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    if (req.user?.role !== "SUPER_ADMIN") {
        throw new BadRequestError_1.BadRequestError("Only admins can access this route. Access denied!");
    }
    next();
});
//# sourceMappingURL=admin.middleware.js.map