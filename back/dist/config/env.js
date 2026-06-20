"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
// Load the .env file into process.env
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    URI: zod_1.z.string().min(1),
    PORT: zod_1.z.string().default("3000"),
    NODE_ENV: zod_1.z
        .enum(["development", "test", "production"])
        .default("development"),
    JWT_SECRET: zod_1.z.string().min(1),
    EMAIL_HOST: zod_1.z.string().min(1),
    EMAIL_PORT: zod_1.z.string().default("465"),
    EMAIL_USER: zod_1.z.string().min(1),
    EMAIL_PASS: zod_1.z.string().min(1),
});
// This will throw an error if process.env.variable is missing
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map