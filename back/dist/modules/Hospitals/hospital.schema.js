"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalSchema = void 0;
const zod_1 = require("zod");
exports.HospitalSchema = zod_1.z.object({
    _id: zod_1.z.string(),
    hospitalName: zod_1.z.string(),
});
//# sourceMappingURL=hospital.schema.js.map